import { uploadToCloudinary } from "@/cloudinary";
import { FilesInput } from "@/components/FileInput";
import { Checkbox, InputField } from "@/components/InputFields";
import Loader from "@/components/Loader";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

async function EditProperty({ params: { slug } }) {
  const property = await prisma.property.findUnique({ where: { slug } });

  async function handleSubmit(formData) {
    "use server";
    const images = formData.getAll("images");
    const name = formData.get("name");
    const location = formData.get("location");
    const city = formData.get("city");
    const area = +formData.get("area");
    const pricePSF = +formData.get("pricePSF");
    const yield2 = +formData.get("yield");
    const returnTarget = +formData.get("returnTarget");
    const approved = formData.get("approved") === "on" ? true : false;
    const res = await uploadToCloudinary(images);
    console.log(res[0].url);
    await prisma.Property.updateMany({
      where: { id: property.id },
      data: {
        name,
        images: res.map((r) => r.url).join(","),
        location,
        city,
        area,
        pricePSF,
        ["yield"]: yield2,
        returnTarget,
        approved,
      },
    });
    redirect("/admin/property");
  }
  return (
    <div className="p-10">
      <form className="space-y-5" action={handleSubmit}>
        <div className="flex justify-between">
          <div className="text-2xl">Edit</div>
          <div className="flex items-center gap-5">
            <div className="flex items-center text-xl gap-2 w-full">
              <label htmlFor="approved">Approved</label>
              <Checkbox
                id="approved"
                name="approved"
                defaultChecked={property.approved}
              />
            </div>
            <button className="btn btn-default">Save</button>
          </div>
        </div>
        <FilesInput name="images" className="" defaultImages={property.images} multiple />
        <div className="flex gap-5">
          <div className="flex flex-col items-start text-xl gap-2 w-full">
            <label htmlFor="name">Name</label>
            <InputField id="name" name="name" defaultValue={property.name} />
          </div>
          <div className="flex flex-col items-start text-xl gap-2 w-full">
            <label htmlFor="location">Location</label>
            <InputField
              id="location"
              name="location"
              defaultValue={property.location}
            />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col items-start text-xl gap-2 w-full">
            <label htmlFor="city">City</label>
            <InputField id="city" name="city" defaultValue={property.city} />
          </div>
          <div className="flex flex-col items-start text-xl gap-2 w-full">
            <label htmlFor="pincode">Pincode</label>
            <InputField
              id="pincode"
              name="pincode"
              defaultValue={property.pincode || 452001}
            />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col items-start text-xl gap-2 w-full">
            <label htmlFor="area">Area</label>
            <InputField
              id="area"
              name="area"
              type="number"
              min="0"
              max="100000"
              defaultValue={property.area}
            />
          </div>
          <div className="flex flex-col items-start text-xl gap-2 w-full">
            <label htmlFor="pricePSF">Price/Sq.Ft</label>
            <InputField
              id="pricePSF"
              name="pricePSF"
              type="number"
              min="0"
              max="100000"
              defaultValue={property.pricePSF}
            />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col items-start text-xl gap-2 w-full">
            <label htmlFor="area">Yield</label>
            <InputField
              id="yield"
              name="yield"
              type="number"
              min="0"
              max="100"
              step="0.01"
              defaultValue={property.yield}
            />
          </div>
          <div className="flex flex-col items-start text-xl gap-2 w-full">
            <label htmlFor="returnTarget">Return Target</label>
            <InputField
              id="returnTarget"
              name="returnTarget"
              type="number"
              min="0"
              max="100"
              step="0.01"
              defaultValue={property.returnTarget}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
export default EditProperty;
