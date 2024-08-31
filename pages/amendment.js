import dynamic from "next/dynamic";

const AmmendmentComp = dynamic(
  import("@/src/components/state_admin_portal/tabs/amendment"),
  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
);

// import AmmendmentComp from "@/src/components/state_admin_portal/tabs/amendment";

export default AmmendmentComp;
