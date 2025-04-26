import React, { useEffect, useState } from "react";
import { auth, db } from "../authService";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function Notification() {
  const [notification, setNotification] = useState("");
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserDetails(user);
      } else {
        setUserDetails(null);
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const docRef = doc(db, "notifications", "notification");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setNotification(docSnap.data().message);
        } else {
          setNotification("No notification available");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    fetchNotification();
  }, []);

  return (
    <div style={{ marginTop: "580px", padding: "200px" }}>
      {userDetails ? (
        <div>
          <h1>Welcome {userDetails.displayName || "User"}</h1>
          <p>{notification}</p>
        </div>
      ) : (
        <h1>Please sign in to view notifications</h1>
      )}
    </div>
  );
}

export default Notification;
