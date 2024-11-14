import React, { FormEvent, useEffect, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";

const letter = "abcdefghijklmnopqrstuvwxyZABCDEFGHIJKLMNOPQRSTUVWXYZ";
const symbols = `!@#$%^&*()_+=-`;
const numbers = `0123456789`;

const Coupon = () => {
  const [size, setSize] = useState<number>(8);
  const [prefix, setPrefix] = useState<string>("");
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeChar, setIncludeChar] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<string>("");

  const copyText = async (coupon: string) => {
    await window.navigator.clipboard.writeText(coupon);
    setIsCopied(true);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!includeNumbers && !includeSymbols && !includeChar)
      return alert("Please Select On At Least");

    let result: string = prefix || "";

    const looplength: number = size - result.length;

    for (let i = 1; i < looplength; i++) {
      let entireString: string = "";
      if (includeChar) entireString += letter;
      if (includeNumbers) entireString += numbers;
      if (includeSymbols) entireString += symbols;

      const randomNum: number = Math.floor(Math.random() * entireString.length);

      result += entireString[randomNum];
    }
    setCoupon(result);
  };

  useEffect(() => {
    setIsCopied(false);
  }, [coupon]);
  return (
    <>
      {" "}
      <div className="adminContainer">
        <AdminSidebar />
        <main className="dashboardAppContainer">
          <h1>Coupon</h1>
          <section>
            <form onSubmit={submitHandler} className="couponForm">
              <input
                type="text"
                placeholder="Text to Include"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                maxLength={size}
              />
              <input
                type="number"
                placeholder="Coupon Length"
                value={size}
                onChange={(e) => setSize(+e.target.value)}
                min={8}
                max={25}
              />
              <fieldset>
                <legend>Include</legend>

                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers((prev) => !prev)}
                />
                <span>Numbers</span>
                <input
                  type="checkbox"
                  checked={includeChar}
                  onChange={(e) => setIncludeChar((prev) => !prev)}
                />
                <span>Character</span>

                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols((prev) => !prev)}
                />
                <span>Symbols</span>
              </fieldset>

              <button type="submit"> Generate</button>
            </form>
            {coupon && (
              <code>
                {coupon}{" "}
                <span onClick={() => copyText(coupon)}>
                  {isCopied ? "Copied" : "Copy"}
                </span>
              </code>
            )}{" "}
          </section>
        </main>
      </div>
    </>
  );
};

export default Coupon;
