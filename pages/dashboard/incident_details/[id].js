import IncidentDetails from "@/src/components/reg_factory/dashboard/incidentDetails";
import { useRouter } from "next/router";

const IncidentDetail = () => {
  const router = useRouter();

  return <IncidentDetails id={router.query.id} />;
};
export default IncidentDetail;
