// import { v2 } from "cloudinary";

// v2.config({
//   cloud_name: "ds68bmd8q",
//   api_key: "466712952148381",
//   api_secret: "S7qtCGaiJkhmx16PqWVscmjnO2w",
//   secure: true,
// });

// export const cloudinary = v2;

// const form = document.querySelector("form");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const files = document.querySelector("[type=file]").files;
//   const formData = new FormData();

//   for (let i = 0; i < files.length; i++) {
//     let file = files[i];
//     formData.append("file", file);
//     formData.append("upload_preset", "docs_upload_example_us_preset");

//     fetch(url, {
//       method: "POST",
//       body: formData
//     })
//       .then((response) => {
//         return response.text();
//       })
//       .then((data) => {
//         document.getElementById("data").innerHTML += data;
//       });
//   }
// });

export async function uploadToCloudinary(files) {
  const url = "https://api.cloudinary.com/v1_1/ds68bmd8q/image/upload";
  const formData = new FormData();
  const responses = await Promise.all(
    files.map(async (file) => {
      formData.append("file", file);
      formData.append("upload_preset", "a2yfafqb");
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
      return await res.json();
    })
  );
  return responses;
}
