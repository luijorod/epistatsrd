import { BsDownload } from "react-icons/bs";

import { downloadDataset } from "../utils";

interface DownloadButtonProps {
  data: any;
  format: string;
}

export function DownloadButton({ data, format = "csv" }: DownloadButtonProps) {
  return (
    <div className="flex items-center rounded-md bg-sky-700 px-3 py-2 text-white space-x-2 font-bold">
      <BsDownload />
      <button
        onClick={() => downloadDataset(data, format)}
        className="font-bold"
      >
        {format.toUpperCase()}
      </button>
    </div>
  );
}
