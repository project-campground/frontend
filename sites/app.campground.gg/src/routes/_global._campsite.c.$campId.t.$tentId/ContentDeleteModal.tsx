import { Box, Button, DialogActions, DialogContent, DialogTitle, Link, Modal, ModalDialog, Sheet, styled } from "@mui/joy";

type Props = {
    title: string;
    open: boolean;
    ContentRender: () => (React.ReactNode | React.ReactNode[]);
    onClose: () => unknown;
    onConfirm: () => unknown;
};

const ContentDeleteModalFade = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 3,
    background: `linear-gradient(to bottom, transparent, ${theme.vars.palette.background.level1})`,
}));

export default function ContentDeleteModal({ title, open, ContentRender, onClose, onConfirm }: Props) {
    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog>
                <DialogTitle>Delete this {title}?</DialogTitle>
                <DialogContent>This cannot be reversed and will be permanently deleted.</DialogContent>
                <Sheet variant="outlined" sx={{ minWidth: 500, maxHeight: 200, borderRadius: "md", position: "relative", overflow: "hidden" }}>
                    <Box>
                        <ContentRender />
                    </Box>
                    <ContentDeleteModalFade />
                </Sheet>
                <DialogActions>
                    <Button color="danger" variant="solid" onClick={onConfirm}>
                        Delete
                    </Button>
                    <Link color="neutral" onClick={onClose}>
                        Cancel
                    </Link>
                </DialogActions>
            </ModalDialog>
        </Modal>
    );
}