import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { createNote, getAllNotes } from "../../api/notes";

const NotesHistory = () => {
  const [comment, setComment] = useState();
  const [allComments, setAllComments] = useState([]);
  const { id } = useParams();
  const { user } = useUser();
  const [newNoteSubmitted, setNewNoteSubmitted] = useState(false);

  const handleNoteInput = async (e) => {
    e.preventDefault();

    if (comment) {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear();
      const todaysDate = mm + "/" + dd + "/" + yyyy;
      let currentTime =
        new Date().getHours() +
        ":" +
        today.getMinutes() +
        ":" +
        today.getSeconds();

      let noteObject = {
        comment: comment,
        user: user,
        date: todaysDate,
        time: currentTime,
        refId: id,
      };

      const note = await createNote(noteObject).catch((err) => {
        console.log(err.message);
      });
      setComment("");
      // setAllComments((current) => [...current, note]);
      setNewNoteSubmitted(true);
    }
  };

  const fetchAllNotes = async () => {
    const response = await getAllNotes(id);
    if (response) {
      setAllComments(response.results);
      console.log(response.results);
    }
  };

  useEffect(() => {
    fetchAllNotes();
    setNewNoteSubmitted(false);
  }, [newNoteSubmitted]);

  return (
    <div className="w-[80%] flex flex-col items-center border border-gray-400">
      <h1>Notes History</h1>
      <form onSubmit={handleNoteInput} className="w-full flex items-center">
        <input
          type="text"
          placeholder="Add note"
          className=" border w-full mx-4 border-gray-300 rounded-lg"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <button type="submit" className="btn btn-sm mr-2">
          Add
        </button>
      </form>

      {/* Notes List */}
      <div className="w-full overflow-auto ">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th>Created By</th>
              <th>Created On</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {[...allComments].reverse().map((note) => {
              return (
                <tr key={note._id}>
                  <td>{note.user.fullName}</td>
                  <td>
                    {note.date} {note.time}
                  </td>
                  <td>{note.comment}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotesHistory;
