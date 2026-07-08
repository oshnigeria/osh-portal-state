import dynamic from "next/dynamic";

const FactoryPageComp = dynamic(
  import("@/src/components/state_admin_portal/factory_component"),
  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
);
// import FactoryPageComp from "@/src/components/state_admin_portal/factory_component";

export default FactoryPageComp;
