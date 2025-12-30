import { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
const Home = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [sharableLink, setSharableLink] = useState("");
  const [loading, setLoading] = useState(false);
  type ErrorState = {
  paste?: string;
  expiry?: string;
  maxViews?: string;
  general?: string;
  };
  const [errors, setErrors] = useState<ErrorState>({});
  const [input, setInput] = useState({
    paste: "",
    expiryDate: "",
    maxViews: "",
  });

  const onChangeHandler = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setErrors({});
    setIsSaved(false);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHndler = async (e:React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.post(
        "https://pastebin-backend-bh30.onrender.com/api/v1/paste",
        input
      );
      if (response.data.success) {
        console.log(response.data);
        setErrors({});

        // console.log(response.data.newPaste);
        const pasteId = response.data.newPaste._id;
        setSharableLink(`http://localhost:5173/paste/${pasteId}`);
        setIsSaved(true);
        setLoading(false);
      }
    } catch (error:any) {
      console.log("catch error in submit ", error);
      const message = error?.response?.data?.message || "Something went wrong";
      if (message?.includes("Paste")) {
        setErrors({ paste: message });
      } else if (message?.includes("expiry")) {
        setErrors({ expiry: message });
      } else if (message.includes("maxViews")) {
        setErrors({ maxViews: message });
      } else {
        setErrors({ general: message });
      }
      console.log(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen px-0 sm:px-4 md:px-40 ">
        <h1 className="text-center text-2xl font-semibold ">Create a Paste</h1>
        <div className="md:border-2  flex flex-col items-center p-4 bg-white md:shadow-xl">
          <form
            action=""
            onSubmit={onSubmitHndler}
            className=" w-full flex flex-col gap-4"
          >
            <div>
              <textarea
                className="w-full h-48 p-3 border rounded resize-none"
                name="paste"
                onChange={onChangeHandler}
                value={input.paste}
                placeholder="enter the text you want to share"
              ></textarea>
              {errors.paste && (
                <p className="text-red-600 text-sm text-center">
                  {errors.paste}
                </p>
              )}
            </div>

            <p className="text-sm text-gray-800 text-center">
              Optional settings
            </p>
            <div className="flex flex-col justify-between sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="date"
                  className="border p-2  rounded w-full"
                  placeholder="Expiry date"
                  value={input.expiryDate}
                  name="expiryDate"
                  onChange={onChangeHandler}
                />
                {errors.expiry && (
                  <p className="text-red-600 text-sm text-center">
                    {errors.expiry}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <input
                  type="number"
                  min={1}
                  name="maxViews"
                  onChange={onChangeHandler}
                  className="border p-2 rounded w-full"
                  placeholder="set max view count"
                  value={input.maxViews}
                />
                {errors.maxViews && (
                  <p className="text-red-600 text-sm text-center">
                    {errors.maxViews}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || isSaved}
              className={`mx-auto text-center w-24 border px-6 py-1 rounded-2xl
                ${isSaved ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500"}
                 text-white`}
            >
              {loading ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : isSaved ? (
                "saved"
              ) : (
                "save"
              )}
            </button>
            {isSaved && (
              <div className="mt-4 p-3 border rounded-lg bg-gray-50 text-center">
                <p className="text-sm text-gray-700">Sharable link</p>
                <a
                  href={sharableLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm break-all underline"
                >
                  {sharableLink}
                </a>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
