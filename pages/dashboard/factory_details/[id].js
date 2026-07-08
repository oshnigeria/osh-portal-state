import FactoryDetails from "@/src/components/reg_factory/dashboard/factoryDetails";
import { useRouter } from "next/router";

const FactoryDetail = () => {
  const router = useRouter();

  return <FactoryDetails id={router.query.id} />;
};
export default FactoryDetail;
