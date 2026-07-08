import dynamic from "next/dynamic";

const ReplacementComp = dynamic(
  import("@/src/components/state_admin_portal/tabs/replacement"),
  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
);

// import ReplacementComp from "@/src/components/state_admin_portal/tabs/replacement";

export default ReplacementComp;
