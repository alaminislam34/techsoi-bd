import CommonWrapper from "@/components/layout/CommonWrapper";
import { MapPinIcon } from "lucide-react";
import { Phone } from "lucide-react";
import { Mail } from "lucide-react";

export default function NavbarTop() {
  return (
    <>
      <div className="py-3 w-full bg-blue-200 ">
        <CommonWrapper>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs">
            <p className="flex items-center gap-2">
              <span className="text-primary">
                <Mail size={15} />
              </span>{" "}
              hellotechsoi@gmail.com
            </p>
            <p className="flex items-center gap-2">
              {" "}
              <span className="text-primary">
                <Phone size={15} />
              </span>{" "}
              +888 0000 000 000{" "}
            </p>
            <p className="flex items-center gap-2">
              {" "}
              <span className="text-primary">
                <MapPinIcon size={15} />
              </span>{" "}
              Mohakhali, Amtoli, Dhaka, Bangladesh.
            </p>
          </div>
        </CommonWrapper>
      </div>
    </>
  );
}
