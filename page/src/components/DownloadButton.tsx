import { BsDownload } from "react-icons/bs";

import { downloadDataset } from "../utils";

interface DownloadButtonProps {
  data: any;
  format: string;
}

export function DownloadButton({ data, format = "csv" }: DownloadButtonProps) {
  return (
    <div className="flex items-center justify-center rounded-md bg-blue-700 px-3 py-2 text-white space-x-2 text-sm">
      <BsDownload />
      <button onClick={() => downloadDataset(data, format)}>
        {format.toUpperCase()}
      </button>
    </div>
  );
}
