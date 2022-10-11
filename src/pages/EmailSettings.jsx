import React, { useEffect, useState } from "react";
import {
  addPastDueContacts,
  addCurrentlyDueContacts,
  addUCRContacts,
  sendCurrentlyDueEmails,
  sendPastDueEmails,
  sendUCRDueEmails,
} from "../api/sendGrid";
import toast from "react-hot-toast";

const styles = {
  wrapper: "w-full flex flex-col items-center justify-center",
  searchContainer: "flex flex-col w-full items-center",
  label: "mb-10",
  labelText:
    "font-extrabold text-transparent md:text-4xl lg:text-6xl bg-clip-text bg-gradient-to-r from-orange-400 to-orange-900",
  buttonSectionWrapper:
    "flex justify-evenly w-6/12 lg:h-20 md:h-16 sm:h-12 lg:text-md md:text-sm",
  button:
    "lg:w-40 md:w-30 lg:p-3 md:p-2 shadow-md rounded-2xl bg-gradient-to-b from-orange-500 to-orange-800 text-white hover:bg-gradient-to-t hover:from-orange-500 hover:to-orange-900 hover:text-white",
};

const EmailSettings = () => {
  const handleAddCurrentlyDueContacts = async (e) => {
    e.preventDefault();
    try {
      const response = addCurrentlyDueContacts();
      toast.promise(response, {
        loading: "Adding contacts...",
        success: () => {
          toast.success("Succesfully added contacts.");
        },
        error:
          "Unable to add contacts. Please wait a minute, refresh the page and try again.",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddPastDueContacts = async (e) => {
    e.preventDefault();
    try {
      const response = addPastDueContacts();
      toast.promise(response, {
        loading: "Adding contacts...",
        success: () => {
          toast.success("Succesfully added contacts.");
        },
        error:
          "Unable to add contacts. Please wait a minute, refresh the page and try again.",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddUCRDueContacts = async (e) => {
    e.preventDefault();
    try {
      const response = addUCRContacts();
      toast.promise(response, {
        loading: "Adding contacts...",
        success: () => {
          toast.success("Succesfully added contacts.");
        },
        error:
          "Unable to add contacts. Please wait a minute, refresh the page and try again.",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleCurrentlyDueButton = async (e) => {
    e.preventDefault();
    try {
      const response = sendCurrentlyDueEmails();
      toast.promise(response, {
        loading: "Preparing emails...",
        success: () => {
          toast.success("Succesfully sent emails.");
        },
        error:
          "Unable to prepare emails. Please wait a minute, refresh the page and try again.",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handlePastDueButton = async (e) => {
    e.preventDefault();
    try {
      const response = sendPastDueEmails();
      toast.promise(response, {
        loading: "Preparing emails...",
        success: () => {
          toast.success("Succesfully sent emails.");
        },
        error:
          "Unable to prepare emails. Please wait a minute, refresh the page and try again.",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUCRDueButton = async (e) => {
    e.preventDefault();
    try {
      const response = sendUCRDueEmails();
      toast.promise(response, {
        loading: "Preparing emails...",
        success: () => {
          toast.success("Succesfully sent emails.");
        },
        error:
          "Unable to prepare emails. Please wait a minute, refresh the page and try again.",
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, []);
  return (
    <>
      {" "}
      <div className="w-6/12 bg-orange-100 rounded-lg p-1 drop-shadow-md my-10">
        <p>
          All emails are managed by SendGrid. When sending emails to the
          respective parties, all contacts in SendGrid will get deleted and
          replaced with a fresh copy from our database. This is to ensure we're
          always sending emails to the most up to date users.
        </p>
      </div>
      <div className={styles.buttonSectionWrapper}>
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleAddCurrentlyDueContacts}
            className={styles.button}
          >
            ADD/UPDATE CURRENTLY DUE CONTACTS
          </button>
          <button onClick={handleCurrentlyDueButton} className={styles.button}>
            SEND CURRENTLY DUE EMAILS
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          <button onClick={handleAddPastDueContacts} className={styles.button}>
            ADD/UPDATE PAST DUE CONTACTS
          </button>
          <button onClick={handlePastDueButton} className={styles.button}>
            SEND PAST DUE EMAILS
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          <button onClick={handleAddUCRDueContacts} className={styles.button}>
            ADD/UPDATE UCR CONTACTS
          </button>
          <button onClick={handleUCRDueButton} className={styles.button}>
            SEND UCR EMAILS
          </button>
        </div>
      </div>
    </>
  );
};

export default EmailSettings;
