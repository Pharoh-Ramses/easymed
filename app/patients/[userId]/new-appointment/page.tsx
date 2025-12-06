import AppointmentForm from "@/components/forms/AppointmentForm";
import TimeSlotPicker from "@/components/scheduling/TimeSlotPicker";
import { providerAvailabilities } from "@/components/scheduling/constants";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";
import * as Sentry from "@sentry/nextjs";

export default async function NewAppointment({
  params: { userId },
}: SearchParamProps) {
  const patient = await getPatient(userId);
  Sentry.metrics.set("user_view_new-appointment", patient.name);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="Patient"
            className="mb-12 h-10 w-fit"
          />
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />
          <div className="mt-10">
            <TimeSlotPicker availabilities={providerAvailabilities} />
          </div>
          <p className="copyright mt-10 py-12">© 2024 easymed</p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="An image of doctors smiling in an approachable manner"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}
