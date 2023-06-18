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
  const [message, setMessage] = useState("");

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
    const imageRef = ref(storage, `profile-images/${authUser.uid}`);
    await uploadBytes(imageRef, profileImage);

    const userRef = doc(firestore, "users", authUser.uid);
    await updateDoc(userRef, {
      profileImageURL: await getDownloadURL(imageRef),
    });
    setProfileImageURL(await getDownloadURL(imageRef));
    setProfileImage(null);
    setMessage("Success change avatar, refresh the page!");
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
      const imageRef = ref(storage, `profile-images/${authUser.uid}`);

      await uploadBytes(imageRef, blob);
      await updateDoc(userRef, {
        profileImageURL: await getDownloadURL(imageRef),
      });

      setProfileImageURL(await getDownloadURL(imageRef));
      setIsShown(false);
      setMessage("Profile image has been updated successfully");
    } catch (error) {
      console.error(error);
      setMessage("Failed to update profile image");
    }
  }

  async function handleDeleteImage() {
    if (!authUser) {
      alert("You're not login yet!!");
      return;
    }

    const imageRef = ref(storage, `profile-images/${authUser.uid}`);

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
        setMessage("Profile image has been deleted successfully");
      } catch (error) {
        console.error(error);
        setMessage("Failed to delete profile image");
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
        {message && <PopUp message={message} setMessage={setMessage} />}
        <div className="imageBox">
          <div className="imageInn">
            <UserImg src={profileImageURL} onClick={handleOpenImage} />
          </div>
          <div className="hoverImg" onClick={handleOpenImage}>
            <HoverTextImage>Preview Image</HoverTextImage>
          </div>
        </div>
        {isOpen && (
          <ImageShowContainer>
            <MessagePopup>
              <PreviewImage src={profileImageURL} alt="Preview Image" />
              <IconButton
                className="close-btn-image"
                style={{ float: "right" }}
                onClick={handleCloseImage}
              >
                <HighlightOffIcon
                  style={{ fontSize: "50px", color: "#d9534f" }}
                />
              </IconButton>
              {profileImageURL !==
              "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117" ? (
                <IconButton onClick={handleDeleteImage}>
                  <DeleteIcon style={{ fontSize: "50px", color: "#d9534f" }} />
                </IconButton>
              ) : null}
            </MessagePopup>
          </ImageShowContainer>
        )}
        <SubmitButton onClick={handleOpen}>Change Image</SubmitButton>
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
            <h2 style={{ textAlign: "center", color: "#fff" }}>Or</h2>
            <DropContainer htmlFor="image-upload">
              <span className="drop-title">Drop photo here</span>
              or
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
            </DropContainer>
            <SubmitButton onClick={handleProfileImageUpload}>
              Submit
            </SubmitButton>
          </PopupContainer>
        </>
      )}
    </>
  );
}

export default UserPhoto;

const SubmitButton = styled.span`
  background-color: #3140f0;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  margin-top: 40px;
  color: #fff;
  transition: 0.5s ease-in-out;
  z-index: 3;

  span {
    font-size: 20px;
  }

  &:hover {
    background-color: #3f51b5;
    color: #fff;
  }
`;

const UserImg = styled.img`
  border-radius: 50%;
  width: 200px;
  height: 200px;
  cursor: pointer;
  object-fit: cover;
`;

const ChooseImg = styled.img`
  width: 100px;
  height: 100px;
  cursor: pointer;
  margin: 10px;
`;

const HoverTextImage = styled.span`
  height: auto;
  cursor: pointer;
  position: relative;
  top: 45%;
  font-size: 20px;
  color: #fff;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .imageInn {
    display: flex;
    width: 200px;
    height: 200px;
    align-items: center;
  }

  .imageBox {
    position: relative;
    float: left;
  }

  .hoverImg {
    position: absolute;
    cursor: pointer;
    left: 0;
    top: 0;
    opacity: 0;
    border-radius: 50%;
    display: flex;
    transition: opacity 0.3s ease-in-out;
    background-color: rgb(32, 33, 36, 0.8);
    width: 200px;
    height: 200px;
    text-align: center;
    justify-content: center;
  }

  .imageBox:hover .hoverImg {
    display: block;
    border-radius: 50%;
    opacity: 1;
  }

  .close-btn-image {
    position: absolute;
    top: 100px;
    right: 100px;
  }
`;

const Upload = styled.input`
  width: 100%;
  max-width: 100%;
  color: #444;
  padding: 5px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #555;

  ::file-selector-button {
    margin-right: 20px;
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

const DropContainer = styled.label`
  position: relative;
  margin: 40px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  padding: 20px;
  border-radius: 10px;
  border: 2px dashed #555;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s ease-in-out, border 0.2s ease-in-out;

  &:hover {
    background: #eee;
    border-color: #111;
    color: #444;
  }

  .drop-title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    transition: color 0.2s ease-in-out;
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

const MessagePopup = styled.div`
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageShowContainer = styled.div`
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const PreviewImage = styled.img`
  width: 50%;
  height: auto;
  cursor: pointer;
`;
