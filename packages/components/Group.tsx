import { Stack, styled } from "@mui/joy";

const Group = styled(Stack, {
    name: "CampgroundGroup",
    slot: "root"
})(() => ({
    flexDirection: "row",
}));
export default Group;