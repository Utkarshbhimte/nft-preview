import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const location = useLocation();
  const [code, setCode] = useState(null);

  const [codeJson, setCodeJson] = useState(null);
  const [codeImage, setCodeImage] = useState(null);

  useEffect(() => {
    const currCode = new URLSearchParams(location.search).get("code");
    setCode(currCode);
  }, [location]);

  useEffect(() => {
    try {
      if (!code) {
        throw new Error("code is not available");
      }

      const [, jsonContentEncoded] = code.split("base64,");
      if (!jsonContentEncoded) {
        throw new Error("json content is not valid");
      }
      const { image, ...jsonContent } = JSON.parse(atob(jsonContentEncoded));
      setCodeJson(jsonContent);
      setCodeImage(image);
    } catch (error) {
      console.error(error);
      setCodeJson(null);
      setCodeImage(null);
    }
  }, [code]);

  return (
    <div className="bg-blue-100 text-gray-700 w-screen h-screen grid items-center">
      <div>
        <div className="bg-white rounded-md mx-auto p-4 max-w-2xl w-full">
          <h3 className="text-2xl font-bold mb-2">Get NFT preview</h3>
          <p className="mb-6 text-gray-600">
            Paste your encoded tokenURI below or add it as a query parameter
            "code"{" "}
            <a
              className="underline text-indigo-600"
              href="https://nftpreview.0xdev.codes/?code=data:application/json;base64,eyJuYW1lIjogIkEgZGV2ZWxvcGVyIGluIGFuIGVjb21tZXJjZSBzdGFydHVwIGlnbm9yaW5nIHN0YW5kLXVwIG1lZXRpbmdzIHdoaWxlIGxpc3RlbmluZyB0byB0aW0gZmVycmlzIiwgImRlc2NyaXB0aW9uIjogIkp1c3QgQmFuZ2Fsb3JlIFRlY2hCcm8gdGhpbmdzLiIsICJpbWFnZSI6ICJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlNelV3SWlCb1pXbG5hSFE5SWpNMU1DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklpQndjbVZ6WlhKMlpVRnpjR1ZqZEZKaGRHbHZQU0o0VFdsdVdVMXBiaUJ0WldWMElqNDhjM1I1YkdVK0xtSmhjMlY3Wm1sc2JEb2pNakV5TVRJeE8yWnZiblF0Wm1GdGFXeDVPa2hsYkhabGRHbGpZU3dnYzJGdWN5MXpaWEpwWmp0bWIyNTBMWE5wZW1VNk1qQndlRHRtYjI1MExYZGxhV2RvZERvM01EQTdkR1Y0ZEMxaGJtTm9iM0k2YzNSaGNuUjlQQzl6ZEhsc1pUNDhjbVZqZENCbWFXeHNQU0lqTURBd0lpQjNhV1IwYUQwaU1UQXdKU0lnYUdWcFoyaDBQU0l4TURBbElpQXZQanh6ZG1jZ2VHMXNibk05SjJoMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSnlCM2FXUjBhRDBuTXpVd0p5Qm9aV2xuYUhROUp6TTFNQ2MrUEdSbFpuTStQR3hwYm1WaGNrZHlZV1JwWlc1MElHbGtQU2RuTVNjZ1ozSmhaR2xsYm5SVmJtbDBjejBuZFhObGNsTndZV05sVDI1VmMyVW5JSGd4UFNjdE9TNHhOU1VuSUhreFBTY3hOUzQ0TlNVbklIZ3lQU2N4TURrdU1UVWxKeUI1TWowbk9EUXVNVFVsSno0OGMzUnZjQ0J6ZEc5d0xXTnZiRzl5UFNjallURmpOR1prSnk4K1BITjBiM0FnYjJabWMyVjBQU2N4SnlCemRHOXdMV052Ykc5eVBTY2pZekpsT1daaUp5OCtQQzlzYVc1bFlYSkhjbUZrYVdWdWRENDhMMlJsWm5NK1BISmxZM1FnZDJsa2RHZzlKekV3TUNVbklHaGxhV2RvZEQwbk1UQXdKU2NnWm1sc2JEMG5kWEpzS0NObk1Ta25MejQ4TDNOMlp6NDhkR1Y0ZENCamJHRnpjejBpWW1GelpTSWdlRzFzT25Od1lXTmxQU0p3Y21WelpYSjJaU0lnZVQwaU1qQTBMamN4TlNJZ2VEMGlNalF1TWpnMklqNUJJR1JsZG1Wc2IzQmxjand2ZEdWNGRENDhkR1Y0ZENCamJHRnpjejBpWW1GelpTSWdlRzFzT25Od1lXTmxQU0p3Y21WelpYSjJaU0lnZVQwaU1qUXhMamN4TlNJZ2VEMGlNalF1TWpnMklqNXBiaUJoSUdGdUlHVmpiMjF0WlhKalpTQnpkR0Z5ZEhWd1BDOTBaWGgwUGp4MFpYaDBJR05zWVhOelBTSmlZWE5sSWlCNGJXdzZjM0JoWTJVOUluQnlaWE5sY25abElpQjVQU0l5TnpraUlIZzlJakkwTGpJNU55SSthV2R1YjNKcGJtY2djM1JoYm1RdGRYQWdiV1ZsZEdsdVozTThMM1JsZUhRK1BIUmxlSFFnWTJ4aGMzTTlJbUpoYzJVaUlIaHRiRHB6Y0dGalpUMGljSEpsYzJWeWRtVWlJSGs5SWpNeE5DNDNNVFVpSUhnOUlqSTBMakk0TmlJK2QyaHBiR1VnYkdsemRHVnVhVzVuSUhSdklIUnBiU0JtWlhKeWFYTThMM1JsZUhRK1BDOXpkbWMrIn0="
            >
              example
            </a>
          </p>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              TokenURI code
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <textarea
                rows={3}
                className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md p-2"
                value={code || ""}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          </div>
          {codeJson && (
            <div className="grid grid-cols-3 gap-4 my-8">
              {Object.keys(codeJson).map((key) => (
                <>
                  <div key={key} className="col-start-1 col-end-2 font-bold">
                    {key}
                  </div>
                  <div key={`${key}-value`} className="col-start-2 col-end-4">
                    {codeJson[key]}
                  </div>
                </>
              ))}
            </div>
          )}

          {codeImage && (
            <img
              className="max-w-full max-h-full w-auto"
              src={codeImage}
              alt="NFT preview"
            />
          )}
        </div>
        <div className="text-center my-2">
          Build with <span role="img">❤️</span> by{" "}
          <a
            className="underline text-indigo-700"
            target="__blank"
            href="https://twitter.com/0xBhaisaab"
          >
            0xBhaisaab.
          </a>{" "}
          Check out the code{" "}
          <a
            className="underline text-indigo-700"
            target="__blank"
            href="https://github.com/Utkarshbhimte/nft-preview"
          >
            here
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
