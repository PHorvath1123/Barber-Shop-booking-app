import Navbar from "../components/ui/Navbar";
import Footer from "../components/Footer";
import {useEffect, useRef} from 'react'
import usePolicyAnimation from "../hook/animation/usePolicyAnimation";

export default function Policy() {

  useEffect(() => {
      window.scrollTo(0, 0);
  },[])

  const policyRef = useRef(null);

  usePolicyAnimation(policyRef)

  return (
    <>
      <Navbar></Navbar>
      <main>
        <section className="flex flex-col items-center">
          <h1 className="text-xl font-title mb-[5rem]">Privacy Policy</h1>
          <div ref={policyRef} className="flex flex-col gap-[4rem] items-start text-sm md:text-md w-[80vw] md:w-[65ch] font-text">
            <article>
              <h2 className="mb-[2rem] text-lg">1. Introduction</h2>
              <p>
                This Privacy Policy aims to provide transparent information on
                how we handle users' personal data. 
              </p>
              <p className="mt-[1.2rem] font-bold">Please note that this
                website is for demonstration purposes only, and users are
                advised to provide only fictitious data. The data collected on
                this demo website is solely for contact and booking purposes.
                Please note that this website is a demo, and users are requested
                to provide only fictitious data.</p>
            </article>
            <article>
              <h2 className="mb-[2rem] text-lg">2. Data Controller</h2>
              <p>
                The data controller is the website operator. For inquiries,
                please contact us at: Peter Horvath, prestigecuts96@gmail.com.
              </p>
            </article>
            <article>
              <h2 className="mb-[2rem] text-lg">
                3. Data Collected and Purpose of Processing
              </h2>
              <ol className="list-disc flex flex-col gap-5 relative left-[20px]">
                <li>
                  <b>Contact Form:</b> Name, email address, message. The data is
                  used solely for communication purposes with the user.
                </li>
                <li>
                  <b>Booking Form:</b> Name, email address, phone number,
                  booking date, optional booking comment. The data is used for
                  managing the booking process.
                </li>
              </ol>
            </article>
            <article>
              <h2 className="mb-[2rem] text-lg">
                4. Legal Basis for Data Processing
              </h2>
              <p>
                The legal basis for data processing is the user's voluntary
                consent, provided by accepting the privacy policy and submitting
                the data.
              </p>
            </article>
            <article>
              <h2 className="mb-[2rem] text-lg">5. Data Retention Period</h2>
              <ol className="list-disc flex flex-col gap-5 relative left-[20px]">
                <li>
                  Data provided through the contact form is only stored in email
                  form and will be deleted after the communication purpose has
                  been fulfilled or when it is no longer needed for continued
                  communication.
                </li>
                <li>
                  Data provided through the booking form will be automatically
                  deleted 5 days after the booked date.
                </li>
              </ol>
            </article>
            <article>
              <h2 className="mb-[2rem] text-lg">
                6. Data Sharing and Processing
              </h2>
              <p>
                Your personal data will not be shared with third parties. We do
                not use the data for marketing purposes, and it will not be
                transferred to any third parties.
              </p>
            </article>
            <article>
              <h2 className="mb-[2rem] text-lg">7. Data Security</h2>
              <p>
                Data transmission on this website takes place via <b>HTTPS</b>{" "}
                encryption, ensuring the protection of data during transmission.
                We handle the provided data confidentially and take appropriate
                security measures to prevent unauthorized access.
              </p>
            </article>
            <article>
              <h2 className="mb-[2rem] text-lg">
                8. Rights of the Data Subject
              </h2>
              <p className="mb-[1.4rem]">Users have the right to:</p>
              <ol className="list-disc flex flex-col gap-5 relative left-[20px]">
                <li>Request access to the processed personal data.</li>
                <li>
                  Request correction, deletion, or restriction of the processing
                  of their data.
                </li>
                <li>Withdraw their consent.</li>
                <li>
                  Lodge a complaint with the supervisory authority if they
                  believe their data has been mishandled.
                </li>
              </ol>
              <p className="mt-[3rem]">
                Requests regarding data processing can be submitted via email
                to: prestigecuts96@gmail.com.
              </p>
            </article>
            <article>
              <h2 className="mb-[2rem] text-lg">9. Contact</h2>
              <p>
                If you have any questions regarding data processing, please
                contact us at: prestigecuts96@gmail.com.
              </p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
