import {
  IConfigurationValues,
  IUiSchema,
  UiSchemaRuleEffects,
} from "../../core/schemas/types";
import { IArcGISContext } from "../../ArcGISContext";
import { EntityEditorOptions } from "../../core/schemas/internal/EditorOptions";
import { getWellKnownGroup } from "../getWellKnownGroup";
import { IHubGroup } from "../../core";

/**
 * @private
 * constructs the complete uiSchema for creating a followers
 * group. This defines how the schema properties should be
 * rendered in the follower group creation experience
 */
export const buildUiSchema = async (
  i18nScope: string,
  options: EntityEditorOptions,
  context: IArcGISContext
): Promise<IUiSchema> => {
  const entity = options as IHubGroup;
  return {
    type: "Layout",
    elements: [
      {
        type: "Section",
        options: { section: "stepper", scale: "l" },
        elements: [
          {
            type: "Section",
            labelKey: `${i18nScope}.sections.details.label`,
            options: {
              section: "step",
            },
            elements: [
              {
                labelKey: `${i18nScope}.fields.name.label`,
                scope: "/properties/name",
                type: "Control",
                options: {
                  messages: [
                    {
                      type: "ERROR",
                      keyword: "required",
                      icon: true,
                      labelKey: `${i18nScope}.fields.name.requiredError`,
                    },
                    {
                      type: "ERROR",
                      keyword: "maxLength",
                      icon: true,
                      labelKey: `${i18nScope}.fields.name.maxLengthError`,
                    },
                  ],
                },
              },
              {
                labelKey: `${i18nScope}.fields.summary.label`,
                scope: "/properties/summary",
                type: "Control",
                options: {
                  control: "hub-field-input-input",
                  type: "textarea",
                  rows: 4,
                  messages: [
                    {
                      type: "ERROR",
                      keyword: "maxLength",
                      icon: true,
                      labelKey: `${i18nScope}.fields.summary.maxLengthError`,
                    },
                  ],
                },
              },
            ],
          },
          {
            type: "Section",
            labelKey: `${i18nScope}.sections.membershipAccess.label`,
            options: {
              section: "step",
            },
            rule: {
              effect: UiSchemaRuleEffects.DISABLE,
              condition: {
                scope: "/properties/name",
                schema: { const: "" },
              },
            },
            elements: [
              {
                // there are schema rules that use this so it must be present or they break, so we hide it when its value is false which is always the case for this uiSchema
                scope: "/properties/isSharedUpdate",
                type: "Control",
                rule: {
                  effect: UiSchemaRuleEffects.HIDE,
                  condition: {
                    scope: "/properties/isSharedUpdate",
                    schema: { const: false },
                  },
                },
              },
              {
                labelKey: `${i18nScope}.fields.membershipAccess.label`,
                scope: "/properties/membershipAccess",
                type: "Control",
                options: {
                  control: "hub-field-input-radio",
                  labels: [
                    `{{${i18nScope}.fields.membershipAccess.org.description:translate}}`,
                    `{{${i18nScope}.fields.membershipAccess.collab.description:translate}}`,
                    `{{${i18nScope}.fields.membershipAccess.createFollowers.any:translate}}`,
                  ],
                  disabled: [false, false, entity.isSharedUpdate],
                },
              },
              {
                labelKey: `${i18nScope}.fields.contributeContent.label`,
                scope: "/properties/isViewOnly",
                type: "Control",
                options: {
                  control: "hub-field-input-radio",
                  labels: [
                    `{{${i18nScope}.fields.contributeContent.members.description:translate}}`,
                    `{{${i18nScope}.fields.contributeContent.createFollowers.admins:translate}}`,
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
  };
};

/**
 * @private
 * constructs the default values for creating a followers group.
 * This is used to pre-populate the form with specific default values
 * that are different from the normal Group Schema defaults.
 * @param i18nScope
 * @param options
 * @param context
 * @returns
 */
export const buildDefaults = async (
  i18nScope: string,
  options: EntityEditorOptions,
  context: IArcGISContext
): Promise<IConfigurationValues> => {
  const { name } = options;
  return {
    ...getWellKnownGroup("hubFollowersGroup", context),
  };
};
