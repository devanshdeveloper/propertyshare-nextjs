import Script from "next/script";
import { useRef, useState } from "react";
export default function CloudinaryUploadWidget({ name, location, city }) {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const uploadWidget = useRef(null);

  return (
    <>
      <Script
        src="https://widget.cloudinary.com/v2.0/global/all.js"
        onLoad={() => {
          setIsScriptLoaded(true);
          //@ts-ignore
          uploadWidget.current = cloudinary.createUploadWidget(
            {
              cloudName: "ds68bmd8q",
              uploadPreset: "a2yfafqb",
              cropping: true,
              showAdvancedOptions: true,
              folder: `property/${name}`,
              tags: ["property", name, location, city],
              context: { alt: `property-` },
              clientAllowedFormats: ["images"],
              maxImageFileSize: 2000000,
            },
            (error, result) => {
              if (!error && result && result.event === "success") {
                console.log("Done! Here is the image info: ", result.info);
                document
                  .getElementById("uploadedimage")
                  .setAttribute("src", result.info.secure_url);
              }
            }
          );

          console.log("done");
        }}
      />
      <button
        disabled={!isScriptLoaded}
        onClick={() => uploadWidget.current.open()}
      >
        Upload Images
      </button>
    </>
  );
}
