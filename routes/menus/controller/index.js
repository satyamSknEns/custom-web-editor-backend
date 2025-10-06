import { webMenuModel } from "../../../models/webMenus.js";

async function generateUniqueHandle(baseHandle) {
  let handle = baseHandle;
  let count = 1;

  while (await webMenuModel.findOne({ handle })) {
    handle = `${baseHandle}_${count}`;
    count++;
  }

  return handle;
}

export const createMenu = async (req, res) => {
  try {
    const { title, handle, inUse, menuItems } = req.body;

    if (!title || !handle) {
      return res
        .status(400)
        .json({ success: false, msg: "Title and handle are required" });
    }

    const existingMenu = await webMenuModel.findOne({ title });
    let finalHandle = handle;

    if (existingMenu) {
      finalHandle = await generateUniqueHandle(handle);
    }

    const menu = await webMenuModel.create({
      title,
      handle: finalHandle,
      inUse,
      menuItems: menuItems || [],
    });

    return res.status(201).json({ success: true, data: menu });
  } catch (error) {
    console.error("Create Menu Error:", error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const getMenus = async (req, res) => {
  try {
    const menus = await webMenuModel.find();
    res.json({ success: true, data: menus });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const getMenuById = async (req, res) => {
  try {
    const menu = await webMenuModel.findById(req.params.id);
    if (!menu)
      return res.status(404).json({ success: false, msg: "Menu not found" });
    res.json({ success: true, data: menu });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const updateMenu = async (req, res) => {
  try {
    const { title, handle, inUse, menuItems } = req.body;

    let updateData = { title, inUse, menuItems };
    if (handle) updateData.handle = handle;

    const menu = await webMenuModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    if (!menu)
      return res.status(404).json({ success: false, msg: "Menu not found" });

    res.json({ success: true, data: menu });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const deleteMenu = async (req, res) => {
  try {
    const menu = await webMenuModel.findByIdAndDelete(req.params.id);
    if (!menu)
      return res.status(404).json({ success: false, msg: "Menu not found" });
    res.json({ success: true, msg: "Menu deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};
