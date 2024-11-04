import { MenuItemGroup } from "@/base/components/Menu";
import {
    NestedSidebarDrawer,
    type NestedSidebarDrawerVisibilityProps,
} from "@/base/components/mui/SidebarDrawer";
import { Titlebar } from "@/base/components/Titlebar";
import log from "@/base/log";
import { AppContext } from "@/new/photos/types/context";
import { EnteMenuItem } from "@ente/shared/components/Menu/EnteMenuItem";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { t } from "i18next";
import React, { useContext, useEffect, useState } from "react";
import { Trans } from "react-i18next";
import { getMapEnabledStatus } from "services/userService";

export const MapSettings: React.FC<NestedSidebarDrawerVisibilityProps> = ({
    open,
    onClose,
    onRootClose,
}) => {
    const { mapEnabled, updateMapEnabled } = useContext(AppContext);
    const [modifyMapEnabledView, setModifyMapEnabledView] = useState(false);

    const openModifyMapEnabled = () => setModifyMapEnabledView(true);
    const closeModifyMapEnabled = () => setModifyMapEnabledView(false);

    useEffect(() => {
        if (!open) {
            return;
        }
        const main = async () => {
            const remoteMapValue = await getMapEnabledStatus();
            updateMapEnabled(remoteMapValue);
        };
        main();
    }, [open]);

    const handleRootClose = () => {
        onClose();
        onRootClose();
    };

    return (
        <NestedSidebarDrawer
            {...{ open, onClose }}
            onRootClose={handleRootClose}
        >
            <Stack spacing={"4px"} py={"12px"}>
                <Titlebar
                    onClose={onClose}
                    title={t("map")}
                    onRootClose={handleRootClose}
                />

                <Stack sx={{ px: "16px", py: "20px" }}>
                    <MenuItemGroup>
                        <EnteMenuItem
                            onClick={openModifyMapEnabled}
                            variant="toggle"
                            checked={mapEnabled}
                            label={t("enabled")}
                        />
                    </MenuItemGroup>
                </Stack>
            </Stack>
            <ModifyMapEnabled
                open={modifyMapEnabledView}
                mapEnabled={mapEnabled}
                onClose={closeModifyMapEnabled}
                onRootClose={handleRootClose}
            />
        </NestedSidebarDrawer>
    );
};

const ModifyMapEnabled = ({ open, onClose, onRootClose, mapEnabled }) => {
    const { somethingWentWrong, updateMapEnabled } = useContext(AppContext);

    const disableMap = async () => {
        try {
            await updateMapEnabled(false);
            onClose();
        } catch (e) {
            log.error("Disable Map failed", e);
            somethingWentWrong();
        }
    };

    const enableMap = async () => {
        try {
            await updateMapEnabled(true);
            onClose();
        } catch (e) {
            log.error("Enable Map failed", e);
            somethingWentWrong();
        }
    };

    const handleRootClose = () => {
        onClose();
        onRootClose();
    };

    return (
        <NestedSidebarDrawer
            {...{ open, onClose }}
            onRootClose={handleRootClose}
        >
            {mapEnabled ? (
                <DisableMap
                    onClose={onClose}
                    disableMap={disableMap}
                    onRootClose={handleRootClose}
                />
            ) : (
                <EnableMap
                    onClose={onClose}
                    enableMap={enableMap}
                    onRootClose={handleRootClose}
                />
            )}
        </NestedSidebarDrawer>
    );
};

function EnableMap({ onClose, enableMap, onRootClose }) {
    return (
        <Stack spacing={"4px"} py={"12px"}>
            <Titlebar
                onClose={onClose}
                title={t("enable_maps_confirm")}
                onRootClose={onRootClose}
            />
            <Stack py={"20px"} px={"8px"} spacing={"32px"}>
                <Box px={"8px"}>
                    {" "}
                    <Typography color="text.muted">
                        <Trans
                            i18nKey={"enable_maps_confirm_message"}
                            components={{
                                a: (
                                    <Link
                                        target="_blank"
                                        rel="noopener"
                                        href="https://www.openstreetmap.org/"
                                    />
                                ),
                            }}
                        />
                    </Typography>
                </Box>
                <Stack px={"8px"} spacing={"8px"}>
                    <Button color={"accent"} size="large" onClick={enableMap}>
                        {t("enable")}
                    </Button>
                    <Button color={"secondary"} size="large" onClick={onClose}>
                        {t("cancel")}
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}

function DisableMap({ onClose, disableMap, onRootClose }) {
    return (
        <Stack spacing={"4px"} py={"12px"}>
            <Titlebar
                onClose={onClose}
                title={t("disable_maps_confirm")}
                onRootClose={onRootClose}
            />
            <Stack py={"20px"} px={"8px"} spacing={"32px"}>
                <Box px={"8px"}>
                    <Typography color="text.muted">
                        <Trans i18nKey={"disable_maps_confirm_message"} />
                    </Typography>
                </Box>
                <Stack px={"8px"} spacing={"8px"}>
                    <Button
                        color={"critical"}
                        size="large"
                        onClick={disableMap}
                    >
                        {t("disable")}
                    </Button>
                    <Button color={"secondary"} size="large" onClick={onClose}>
                        {t("cancel")}
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}
