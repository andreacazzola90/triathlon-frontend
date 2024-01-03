export default function Modal({
  title,
  description = "",
  theme = "primary",
  open = false,
}: {
  title: string;
  description?: string;
  theme?: string;
  open?: boolean;
}) {
  return (
    <dialog id="my_modal_1" className="modal" open={open}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{description}</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Chiudi</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
