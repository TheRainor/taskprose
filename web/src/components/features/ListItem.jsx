export function ListItem({ list, onDelete, navigate }) {
  return (
    <div
      className="block w-full box-border max-w-full bg-white/10 hover:bg-white/20 rounded-xl p-4 cursor-pointer"
      onClick={() => navigate(`${list.id}`)}
    >
      <div className="flex items-center justify-between w-full">
        <p className="task-text text-white font-medium whitespace-normal break-all flex-1">
          {list.list_name}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(list.id);
          }}
          className="text-red-600 text-xl cursor-pointer bg-transparent border-none ml-4"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
