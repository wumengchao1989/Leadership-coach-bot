require("dotenv").config();
const {
  azure_chat_deployment_name,
  azure_chatapi,
} = require("../chatgpt/index");
const chatGroups = require("../models/chatGroups.js");
const {
  roleMap,
  assistantLabel,
  userLabel,
  roleDescriptionMap,
} = require("../utils/constants");

async function getChatGroups(req, res) {
  const { id } = req.query;
  let chatGroupsList;
  if (!id) {
    chatGroupsList = await chatGroups.find();
  } else {
    chatGroupsList = await chatGroups.findById(id);
  }
  res.json({
    success: true,
    res: chatGroupsList,
  });
}
async function addChatGroups(req, res) {
  const { chatGroupTitle } = req.body;
  let newChatGroups = new chatGroups({ chatGroupTitle });
  await newChatGroups.save();
  res.json({
    success: true,
    res: newChatGroups,
  });
}

async function deleteChatGroups(req, res) {
  const { id } = req.body;
  await chatGroups.findByIdAndDelete(id);
  res.json({
    success: true,
  });
}
const demoDescription = [
  {
    prompt: "Instruction: You must add <code> tag to the code you provide.",
  },
  {
    prompt:
      "Instruction: the purpose of the 'allowClear' in the datepicker component in Panda Design UI Library is Whether to show clear button",
  },
  {
    prompt:
      "Instruction: the type of the 'allowClear' property in the datepicker in Panda Design UI Library is 'boolean'",
  },
  {
    prompt:
      "Instruction: the default value of allowClear in the datepicker is true.",
  },
  {
    prompt:
      "Instruction: the purpose of the 'autoFocus' in the datepicker component in Panda Design UI Library is If get focus when component mounted",
  },
  {
    prompt:
      "Instruction: the type of the 'autoFocus' property in the datepicker in Panda Design UI Library is 'boolean'",
  },
  {
    prompt:
      "Instruction: the default value of autoFocus in the datepicker is false.",
  },
  {
    prompt:
      "Instruction: the purpose of the 'bordered' in the datepicker component in Panda Design UI Library is Whether has border style",
  },
  {
    prompt:
      "Instruction: the type of the 'bordered' property in the datepicker in Panda Design UI Library is 'boolean'",
  },
  {
    prompt:
      "Instruction: the default value of bordered in the datepicker is true.",
  },
  {
    prompt:
      "Instruction: the purpose of the 'className' in the datepicker component in Panda Design UI Library is The picker className",
  },
  {
    prompt:
      "Instruction: the type of the 'className' property in the datepicker in Panda Design UI Library is 'string'",
  },
  {
    prompt:
      "Instruction: the default value of className in the datepicker is -.",
  },
  {
    prompt:
      "Instruction: the purpose of the 'dateRender' in the datepicker component in Panda Design UI Library is Custom rendering function for date cells",
  },
  {
    prompt:
      "Instruction: the type of the 'dateRender' property in the datepicker in Panda Design UI Library is 'function(currentDate: moment, today: moment) => React.ReactNode'",
  },
  {
    prompt:
      "Instruction: the default value of dateRender in the datepicker is -.",
  },
  {
    prompt:
      "Instruction: the purpose of the 'disabled' in the datepicker component in Panda Design UI Library is Determine whether the DatePicker is disabled",
  },
  {
    prompt:
      "Instruction: the type of the 'disabled' property in the datepicker in Panda Design UI Library is 'boolean'",
  },
  {
    prompt:
      "Instruction: the default value of disabled in the datepicker is false.",
  },
  {
    prompt:
      "Instruction: the purpose of the 'disabledDate' in the datepicker component in Panda Design UI Library is Specify the date that cannot be selected",
  },
  {
    prompt:
      "Instruction: the type of the 'disabledDate' property in the datepicker in Panda Design UI Library is '(currentDate: moment) => boolean'",
  },
  {
    prompt:
      "Instruction: the default value of disabledDate in the datepicker is -.",
  },
  {
    prompt:
      "Instruction: the purpose of the 'dropdownClassName' in the datepicker component in Panda Design UI Library is To customize the className of the popup calendar",
  },
  {
    prompt:
      "Instruction: the type of the 'dropdownClassName' property in the datepicker in Panda Design UI Library is 'string'",
  },
  {
    prompt:
      "Instruction: the default value of dropdownClassName in the datepicker is -.",
  },
  {
    prompt:
      "Instruction: the purpose of the 'getPopupContainer' in the datepicker component in Panda Design UI Library is To set the container of the floating layer, while the default is to create a div element in body",
  },
  {
    prompt:
      "Instruction: the type of the 'getPopupContainer' property in the datepicker in Panda Design UI Library is 'function(trigger)'",
  },
  {
    prompt:
      "Instruction: the default value of getPopupContainer in the datepicker is -.",
  },
  {
    prompt:
      "Instruction: the purpose of the 'inputReadOnly' in the datepicker component in Panda Design UI Library is Set the readonly attribute of the input tag (avoids virtual keyboard on touch devices)",
  },
  {
    prompt:
      "Instruction: the type of the 'inputReadOnly' property in the datepicker in Panda Design UI Library is 'boolean'",
  },
  {
    prompt:
      "Instruction: the default value of inputReadOnly in the datepicker is false.",
  },
  {
    prompt:
      "Instruction: the purpose of the 'locale' in the datepicker component in Panda Design UI Library is Localization configuration",
  },
  {
    prompt:
      "Instruction: the type of the 'locale' property in the datepicker in Panda Design UI Library is 'object'",
  },
  {
    prompt:
      "Instruction: the default value of locale in the datepicker is default.",
  },
  {
    prompt:
      "Instruction: the purpose of the 'mode' in the datepicker component in Panda Design UI Library is The picker panel mode（ Cannot select year or month anymore? )",
  },
  {
    prompt:
      "Instruction: the type of the 'mode' property in the datepicker in Panda Design UI Library is 'time | date | month | year | decade'",
  },
  {
    prompt: "Instruction: the default value of mode in the datepicker is -.",
  },
  {
    prompt:
      "Instruction: the purpose of the 'open' in the datepicker component in Panda Design UI Library is The open state of picker",
  },
  {
    prompt:
      "Instruction: the type of the 'open' property in the datepicker in Panda Design UI Library is 'boolean'",
  },
  {
    prompt: "Instruction: the default value of open in the datepicker is -.",
  },
  {
    prompt:
      "Instruction: the purpose of the 'panelRender' in the datepicker component in Panda Design UI Library is Customize panel render",
  },
  {
    prompt:
      "Instruction: the type of the 'panelRender' property in the datepicker in Panda Design UI Library is '(panelNode) => ReactNode'",
  },
  {
    prompt:
      "Instruction: the default value of panelRender in the datepicker is -.",
  },
  {
    prompt:
      "Instruction: the purpose of the 'picker' in the datepicker component in Panda Design UI Library is Set picker type",
  },
  {
    prompt:
      "Instruction: the type of the 'picker' property in the datepicker in Panda Design UI Library is 'date | week | month | quarter | year'",
  },
  {
    prompt:
      "Instruction: the default value of picker in the datepicker is date.",
  },
  {
    prompt:
      "Instruction: the purpose of the 'placeholder' in the datepicker component in Panda Design UI Library is The placeholder of date input",
  },
  {
    prompt:
      "Instruction: the type of the 'placeholder' property in the datepicker in Panda Design UI Library is 'string | [string,string]'",
  },
  {
    prompt:
      "Instruction: the default value of placeholder in the datepicker is -.",
  },
  {
    prompt:
      "Instruction: the purpose of the 'popupStyle' in the datepicker component in Panda Design UI Library is To customize the style of the popup calendar",
  },
  {
    prompt:
      "Instruction: the type of the 'popupStyle' property in the datepicker in Panda Design UI Library is 'CSSProperties'",
  },
  {
    prompt:
      "Instruction: the default value of popupStyle in the datepicker is {}.",
  },
  {
    prompt:
      "Instruction: the purpose of the 'size' in the datepicker component in Panda Design UI Library is To determine the size of the input box, the height of large and small, are 40px and 24px respectively, while default size is 32px",
  },
  {
    prompt:
      "Instruction: the type of the 'size' property in the datepicker in Panda Design UI Library is 'large | middle | small'",
  },
  {
    prompt: "Instruction: the default value of size in the datepicker is -.",
  },
  {
    prompt:
      "Instruction: the purpose of the 'style' in the datepicker component in Panda Design UI Library is To customize the style of the input box",
  },
  {
    prompt:
      "Instruction: the type of the 'style' property in the datepicker in Panda Design UI Library is 'CSSProperties'",
  },
  {
    prompt: "Instruction: the default value of style in the datepicker is {}.",
  },
  {
    prompt:
      "Instruction: the purpose of the 'suffixIcon' in the datepicker component in Panda Design UI Library is The custom suffix icon",
  },
  {
    prompt:
      "Instruction: the type of the 'suffixIcon' property in the datepicker in Panda Design UI Library is 'ReactNode'",
  },
  {
    prompt:
      "Instruction: the default value of suffixIcon in the datepicker is -.",
  },
  {
    prompt:
      "Instruction: the purpose of the 'onOpenChange' in the datepicker component in Panda Design UI Library is Callback function, can be executed whether the popup calendar is popped up or closed",
  },
  {
    prompt:
      "Instruction: the type of the 'onOpenChange' property in the datepicker in Panda Design UI Library is 'function(open)'",
  },
  {
    prompt:
      "Instruction: the default value of onOpenChange in the datepicker is -.",
  },
  {
    prompt:
      "Instruction: the purpose of the 'onPanelChange' in the datepicker component in Panda Design UI Library is Callback when picker panel mode is changed",
  },
  {
    prompt:
      "Instruction: the type of the 'onPanelChange' property in the datepicker in Panda Design UI Library is 'function(value, mode)'",
  },
  {
    prompt:
      "Instruction: the default value of onPanelChange in the datepicker is -.",
  },
  {
    prompt:
      "Instruction: the datepicker has and only has these prop: allowClear,autoFocus,bordered,className,dateRender,disabled,disabledDate,dropdownClassName,getPopupContainer,inputReadOnly,locale,mode,open,panelRender,picker,placeholder,popupStyle,size,style,suffixIcon,onOpenChange,onPanelChange",
  },
]
  .map((item) => {
    return item.prompt;
  })
  .join("\n");

async function send_request(req, res) {
  const { prompt, is_init, chatGroupId, role } = req.body;
  const roleDescription = roleDescriptionMap["1"];
  const conversionInfoInit = [
    { role: roleMap.user, content: roleDescription },
    {
      role: roleMap.user,
      content: `Hello, I am a ${
        role ? role : ""
      }, and tell me who are you, what is Panda Design and list what you can do to help  ${
        role ? role : ""
      } use Panda Design`,
    },
  ];
  const currentChatGroup = await chatGroups.findById(chatGroupId);
  try {
    if (is_init) {
      currentChatGroup.chatMessages.push({
        role: roleMap.system,
        message: roleDescription + demoDescription,
        createAt: new Date(),
        userName: assistantLabel,
        reverse: false,
      });
      const completion = await azure_chatapi.getChatCompletions(
        azure_chat_deployment_name,
        conversionInfoInit
      );
      currentChatGroup.chatMessages.push({
        role: roleMap.assistant,
        message: completion?.choices?.[0].message.content,
        createAt: new Date(),
        userName: assistantLabel,
        reverse: true,
      });
      await currentChatGroup.save();
      res.status(200).json({
        success: true,
        result: completion,
      });
    } else {
      const newMessage = {
        role: roleMap.user,
        content: prompt,
      };
      const newMessageToDatabase = {
        role: roleMap.user,
        message: prompt,
        createAt: new Date(),
        userName: userLabel,
        reverse: false,
      };
      const conversionInfo = currentChatGroup.chatMessages.map((chat) => {
        return {
          role: chat.role,
          content: chat.message,
        };
      });
      conversionInfo.push(newMessage);
      currentChatGroup.chatMessages.push(newMessageToDatabase);
      await currentChatGroup.save();
      const completion = await azure_chatapi.getChatCompletions(
        azure_chat_deployment_name,
        conversionInfo
      );
      const newReplyToDatabase = {
        role: roleMap.assistant,
        message: completion?.choices?.[0].message.content,
        createAt: new Date(completion.created),
        userName: assistantLabel,
        reverse: true,
      };
      currentChatGroup.chatMessages.push(newReplyToDatabase);
      await currentChatGroup.save();
      res.status(200).json({
        success: true,
        sentMessages: conversionInfo,
      });
    }
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}
module.exports = {
  send_request,
  getChatGroups,
  addChatGroups,
  deleteChatGroups,
};
