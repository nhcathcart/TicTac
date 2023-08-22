"use client";
import { useState } from "react";
import { motion } from "framer-motion"; 
import styles from "./Navbar.module.css";
import { useRouter } from "next/navigation";

export default function Navbar({ children }: { children: React.ReactNode }) {

  const [viewSidebar, setViewSidebar] = useState(true);
  const router = useRouter();

  function toggleSidebar(){
    return setViewSidebar(!viewSidebar)
  }
  return (
    <div className={styles.pageContainer}>
      <div className={styles.navbar}>
        <div className={styles.titleContainer}>
          <h2 className={styles.titleContainerText} onClick={()=>{router.push("/")}}>Games</h2>
          <button
            className={styles.hamburgerMenuButton}
            onClick={() => {
              toggleSidebar()
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={styles.hamburgerMenuButton}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className={styles.sideBarAndContentContainer}>
        <motion.div
          className={styles.sidebar}
          initial={{
            width: viewSidebar ? "250px" : "0px",
          }}
          animate={{
            width: viewSidebar ? "250px" : "0px",
          }}
          transition={{type: "linear", duration: 0.3}}
        >
          <NavButton
            title="tic-tac-toe"
            onClick={() => {router.push("/tic-tac-toe")}}
          />
        </motion.div>
        <div className={styles.contentContainer}>{children}</div>
      </div>
    </div>
  );
}

interface props {
  title: string;
  onClick: Function;
  childButtons?: { title: string; onClick: Function }[];
}

function NavButton({ title, onClick, childButtons }: props) {
  const [showChildren, setShowChildren] = useState(false);

  if (!childButtons) {
    return <button className={styles.navButton} onClick={() => onClick()}>{title}</button>;
  }

  const childArray = childButtons.map((child) => {
    return (
      <button
        key={child.title}
        onClick={() => child.onClick()}
        className={styles.navButton}
      >
        {child.title}
      </button>
    );
  });

  return (
    <>
      <button
        onClick={() => {
          onClick();
          setShowChildren(!showChildren);
        }}
        className={styles.navButton}
      >
        {title}
      </button>
      {showChildren ? (
        <div className={styles.childButtonContainer}>{childArray}</div>
      ) : null}
    </>
  );
}
