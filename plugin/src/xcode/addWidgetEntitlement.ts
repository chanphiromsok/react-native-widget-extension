import { XcodeProject } from "@expo/config-plugins";

type AddWidgetEntitlementProps = {
  targetName: string;
  entitlementsFilename: string;
};
export const addWidgetEntitlement = (
  xcodeProject: XcodeProject,
  { entitlementsFilename, targetName }: AddWidgetEntitlementProps
) => {
  const targetUuid = xcodeProject.findTargetKey(targetName);
  const groupUuid = xcodeProject.findPBXGroupKey({ name: targetName });

  xcodeProject.addFile(entitlementsFilename, groupUuid, {
    target: targetUuid,
    lastKnownFileType: "text.plist.entitlements",
  });

  // update build properties
  xcodeProject.updateBuildProperty(
    "CODE_SIGN_ENTITLEMENTS",
    `${targetName}/${entitlementsFilename}`,
    null,
    targetName
  );
};
