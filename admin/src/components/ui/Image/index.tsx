// import SingleDriverDocument from "@/components/Driver/SingleDriverDocument";
import React from "react";
import { Document, Page } from "react-pdf";


interface RenderImageViewProps {
    src?: string;
    alt: string;
    notFoundMessage: string;
}
export const RenderImageView: React.FC<RenderImageViewProps> = ({ src, alt, notFoundMessage }) => {
    const [isFullScreenView, setIsFullScreenView] = React.useState<boolean>(false)
    const [fileType, setFileType] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (src) {
            const splitUrl = src.split(".");
            const extension = splitUrl[splitUrl.length - 1].toLowerCase();
            setFileType(extension);
        }
    }, [src]);

    const toggleFullScreenView = () => {
        setIsFullScreenView(!isFullScreenView)
    }
    return (
        <React.Fragment>
            {/* {isFullScreenView && (
                <SingleDriverDocument isOpen={isFullScreenView} toggleModal={toggleFullScreenView} document={src} />
            )} */}
            <figure className="cursor-pointer max-h-550 overflow-y-auto border" onClick={toggleFullScreenView}>
                {fileType === "pdf" ? (
                    <Document file={src}>
                        <Page pageNumber={1} />
                    </Document>
                ) : fileType === "jpg" || fileType === "jpeg" || fileType === "png" ? (
                    <img className="h-[550px] w-[550px] object-cover rounded-lg" src={src} alt={alt} />
                ) : (
                    <p>{notFoundMessage}</p>
                )}
            </figure>
        </React.Fragment>
    );
};

export default RenderImageView