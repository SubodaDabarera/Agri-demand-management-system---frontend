import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import MyRequestsWrapper from "../../components/wrappers/farmer/MyRequestsWrapper";
import axios from "axios";
import moment from "moment/moment";

export default function FarmerHome() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    function getAnnouncememnts() {
      axios
        .get("http://localhost:8000/api/announcement")
        .then((res) => {
          console.log(res.data);
          setAnnouncements(res.data);
        })
        .catch((err) => {
          alert(err);
        });
    }

    getAnnouncememnts();
  }, []);

  return (
    <div>

      <p className="font-semibold text-3xl text-center text-red-700 mt-20">
        <u> Announcements</u>
      </p>

      <MyRequestsWrapper>

        {announcements &&
          announcements.map((announcement) => (
            <div
              key={announcement._id}
              className="bg-emerald-100 shadow overflow-hidden sm:rounded-md my-4"
            >
              <div className="block">
                <div className="px-4 py-4 sm:px-6">
                  <div className="mt-2 grid grid-cols-5">
                    <p className="flex col-span-1 items-center text-sm text-emerald-700">
                      Heading
                    </p>
                    <p className="mt-2 col-span-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      : {announcement.heading}
                    </p>
                  </div>

                  <div className="mt-2 grid grid-cols-5 ">
                    <p className="flex col-span-1 items-center text-sm text-emerald-700 ">
                      Message
                    </p>
                    <p className="mt-2 col-span-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      : {announcement.message}
                    </p>
                  </div>
                  <div className="mt-2 grid grid-cols-5 ">
                    <p className="flex col-span-1 items-center text-sm text-emerald-700 ">

                        Posted Date
                    </p>
                    <p className="mt-2 col-span-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      : {moment(announcement.postingDate).format('L')}
                    </p>
                  </div>
                  <div className="mt-2 grid grid-cols-5 ">
                    <p className="flex col-span-1 items-center text-sm text-emerald-700 ">
                        Deadline
                    </p>
                    <p className="mt-2 col-span-2 flex items-center text-sm text-gray-500 sm:mt-0">
                       : {moment(announcement.DeadLine).format('L')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </MyRequestsWrapper>
    </div>
  );
}
