export const metadata = {
  title: 'Patients - easymed',
  description: 'Patient registration and appointments',
}

export default function PatientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
