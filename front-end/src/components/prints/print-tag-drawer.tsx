import { Button, Drawer, Segmented } from "antd";
import { Printer } from "lucide-react";
import PDFTag from "./pdf/tag";
import { FC, useEffect, useRef, useState } from "react";
import { PrintTable } from "./print-table";
import { useReactToPrint } from "react-to-print";
import { useAppSelector } from "@/store/hook";

export type TPrintTagDrawer = {
  open?: boolean;
  onConfirm?: () => void;
  onClose?: () => void;
  onCancel?: () => void;
};

export const PrintTagDrawer: FC<TPrintTagDrawer> = ({
  open = false,
  onClose,
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  const { printTags } = useAppSelector((state) => state.printTags);
  const [segmented, setSegmented] = useState("Part List");

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Document Title",
    onAfterPrint: () => console.log("Printing completed"),
  });

  useEffect(() => {
    setSegmented("Part List");
  }, [open]);

  return (
    <Drawer
      title='Print Tags'
      width={"230mm"}
      open={open}
      onClose={onClose}
      footer={
        <div className=' w-full flex justify-end'>
          <Button
            className=' flex gap-2 px-2 font-medium'
            onClick={() => handlePrint()}
            disabled={
              (printTags?.find(({ no_tags }) => (no_tags ?? 0) > 0)?.no_tags ??
                0) === 0
            }>
            <Printer size={20} />
            Print
          </Button>
        </div>
      }>
      <div className=' flex flex-col gap-2 w-full h-full overflow-hidden'>
        <Segmented<string>
          options={["Part List", "Preview"]}
          className='p-1 w-min'
          value={segmented}
          onChange={(value) => setSegmented(value)}
        />
        <div className=' w-full h-full overflow-auto'>
          <div className='flex w-full rounded-md overflow-hidden flex-col space-y-2'>
            {segmented === "Part List" ? <PrintTable /> : <PDFTag />}
          </div>
        </div>
        <div className=' hidden'>
          <div ref={printRef}>
            <PDFTag />
          </div>
        </div>
      </div>
    </Drawer>
  );
};
