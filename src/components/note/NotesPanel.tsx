import AddNoteForm from "@/components/note/AddNoteForm.tsx";
import {Task} from "../../types";
import NoteDetails from "@/components/note/NoteDetails.tsx";

type NotesPanelProps = {
    notes: Task["notes"];
};

const NotesPanel = ({notes}: NotesPanelProps) => {
    return (
        <>
            <AddNoteForm/>
            <div className="divide-y divide-gray-100 mt-10">
                {
                    notes.length > 0 ? (
                        <>
                            <p className="font-bold text-2xl text-slate-600 my-5">
                                Notas:
                            </p>
                            {
                                notes.map((note) => (
                                    <NoteDetails key={note._id} note={note}/>
                                ))
                            }
                        </>
                    ) : (
                        <p className="text-lg text-slate-500">No hay notas para mostrar</p>
                    )
                }
            </div>
        </>
    )
};

export default NotesPanel;
