import { useState, useEffect } from "react";
import { storage } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import PopUp from "../../utils/PopUpMessage/PopUp";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function UserPhoto() {
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageURL, setProfileImageURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117" // URL default
  );
  const [authUser, setAuthUser] = useState(null);
  const firestore = getFirestore();
  const storageRef = ref(storage);
  const [isShown, setIsShown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const images = [
    {
      url: "/images/avatar/image-5.png",
      name: "Image 1",
    },
    {
      url: "/images/avatar/image-2.png",
      name: "Image 2",
    },
    {
      url: "/images/avatar/image-6.png",
      name: "Image 3",
    },
    {
      url: "/images/avatar/image-7.png",
      name: "Image 4",
    },
    {
      url: "/images/avatar/image-3.png",
      name: "Image 5",
    },
    {
      url: "/images/avatar/image-8.png",
      name: "Image 6",
    },
    {
      url: "/images/avatar/image-9.png",
      name: "Image 7",
    },
    // Tambahkan gambar yang ingin ditampilkan
  ];

  const [randomCharacter, setRandomCharacter] = useState("");

  const generateRandomCharacter = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomChar = characters.charAt(randomIndex);
    setRandomCharacter(randomChar);
  };

  useEffect(() => {
    if (!authUser) return; // Jika pengguna belum masuk, hentikan efek samping

    const userRef = doc(firestore, "users", authUser.uid);

    async function getProfileImage() {
      const docSnap = await getDoc(userRef);
      const data = docSnap.data();
      if (data.profileImageURL) {
        setProfileImageURL(data.profileImageURL);
      }
    }

    getProfileImage();
  }, [authUser, firestore, storageRef]);

  onAuthStateChanged(getAuth(), (user) => {
    setAuthUser(user);
  });

  async function handleProfileImageUpload() {
    if (!authUser) {
      alert("You're not login yet!!");
      return;
    }
    try {
      const randomCharacter = generateRandomCharacter();
      const imageRef = ref(
        storage,
        `profile-images/${authUser.uid}-${randomCharacter}`
      );
      await uploadBytes(imageRef, profileImage);

      const userRef = doc(firestore, "users", authUser.uid);
      await updateDoc(userRef, {
        profileImageURL: await getDownloadURL(imageRef),
      });
      setProfileImageURL(await getDownloadURL(imageRef));
      setProfileImage(null);
      toast.succes("Success change avatar, refresh the page!");
    } catch (error) {
      toast.error("Error Occurred");
    }
  }

  function handleProfileImageChange(event) {
    setProfileImage(event.target.files[0]);
  }

  const handleClose = () => {
    setIsShown(false);
  };

  const handleOpen = () => {
    setIsShown(true);
  };

  const handleCloseImage = () => {
    setIsOpen(false);
  };

  const handleOpenImage = () => {
    setIsOpen(true);
  };

  function handleImageClick(url) {
    setProfileImageURL(url);
    setIsOpen(false);
  }

  async function handleSelectImage(url) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const userRef = doc(firestore, "users", authUser.uid);
      const randomCharacter = generateRandomCharacter();
      const imageRef = ref(
        storage,
        `profile-images/${authUser.uid}-${randomCharacter}`
      );

      await uploadBytes(imageRef, blob);
      await updateDoc(userRef, {
        profileImageURL: await getDownloadURL(imageRef),
      });

      setProfileImageURL(await getDownloadURL(imageRef));
      setIsShown(false);
      toast.succes("Profile image has been updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile image");
    }
  }

  async function handleDeleteImage() {
    if (!authUser) {
      alert("You're not login yet!!");
      return;
    }

    const randomCharacter = generateRandomCharacter();
    const imageRef = ref(
      storage,
      `profile-images/${authUser.uid}-${randomCharacter}`
    );

    // tampilkan prompt konfirmasi
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (confirmDelete) {
      // hapus gambar
      try {
        await deleteObject(imageRef);
        const userRef = doc(firestore, "users", authUser.uid);
        await updateDoc(userRef, {
          profileImageURL:
            "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117",
        });
        setProfileImageURL(
          "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
        );
        setProfileImage(null);
        setIsOpen(false);
        toast.succes("Profile image has been deleted successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete profile image");
      }
    }
  }

  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  return (
    <>
      <Container>
        <div className="imageBox">
          <div className="imageInn">
            <UserImg src={profileImageURL} />
          </div>
          <HoverTextImage onClick={handleOpen}>
            <EditIcon />
          </HoverTextImage>
        </div>
      </Container>
      {isShown && (
        <>
          <PopupContainer>
            <h2 style={{ textAlign: "center", color: "#fff" }}>Choose Img</h2>
            <div
              style={{
                display: "grid",
                gridAutoRows: "1fr",
                gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                gap: "20px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {images.map((image) => (
                <ChooseImg
                  key={image.url}
                  src={image.url}
                  alt={image.name}
                  onClick={() => handleSelectImage(image.url)}
                />
              ))}
            </div>
            <CloseButton onClick={handleClose}>
              <CloseIcon />
            </CloseButton>
            <DropContainer htmlFor="image-upload">
              <Upload
                type="file"
                id="profile-image"
                onChange={(e) => {
                  handleProfileImageChange(e);
                  handleFileInputChange(e);
                }}
                accept="image/*"
                required
              />
              <SubmitButton onClick={handleProfileImageUpload}>
                <CloudUploadIcon />
              </SubmitButton>
            </DropContainer>
          </PopupContainer>
        </>
      )}
    </>
  );
}

export default UserPhoto;

const UserImg = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
`;

const HoverTextImage = styled.button`
  position: absolute;
  left: 10px;
  bottom: 10px;
  font-size: 18px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: rgb(32, 33, 36, 0.8);
  border: none;
  color: #fff;
  transition: 0.5s;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 45px;
    padding: 0px 20px;
    font-size: 12px;
    margin: 0px 10px 0px 0px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .imageInn {
    display: flex;
    width: 150px;
    height: 150px;
    align-items: center;
  }

  .imageBox {
    position: relative;
    float: left;
  }

  .close-btn-image {
    position: absolute;
    top: 100px;
    right: 100px;
  }
`;

const DropContainer = styled.label`
  position: relative;
  display: flex;
  justify-content: center;
  transition: background 0.2s ease-in-out, border 0.2s ease-in-out;
`;

const Upload = styled.input`
  color: #444;
  padding: 5px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #555;
  margin: 20px;

  ::file-selector-button {
    border: none;
    background: #084cdf;
    padding: 10px 20px;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    transition: background 0.2s ease-in-out;

    &:hover {
      background: #0d45a5;
    }
  }
`;

const SubmitButton = styled.span`
  background-color: rgb(8, 76, 223);
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #fff;
  transition: 0.5s ease-in-out;
  z-index: 3;
  margin: 20px;

  span {
    font-size: 20px;
  }

  &:hover {
    transform: scale(1.05);
    color: #fff;
  }
`;

const PopupContainer = styled.div`
  position: fixed;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 999;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  width: 60%;

  @media (max-width: 768px) {
    width: 90%;
    padding: 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  color: #fff;

  &:hover {
    color: #ff69b4;
  }
`;

const ChooseImg = styled.img`
  width: 100%;
  height: auto;
  cursor: pointer;

  @media (max-width: 768px) {
    max-width: 80px;
    max-height: 80px;
  }
`;
