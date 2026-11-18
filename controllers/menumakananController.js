import MenuMakanan from "../models/menumakanan.js";

const SORTABLE_FIELDS = ["name", "description", "price", "is_available"];

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const str = (v) =>
  typeof v === "string" && v.trim() !== "" ? v.trim() : undefined;

const toBool = (v) => {
  const s = String(v).toLowerCase();
  if (s === "true") return true;
  if (s === "false") return false;
  return undefined;
};

const buildFilter = (query) => {
  const filter = {};

  const name = str(query.name);
  const description = str(query.description);
  const isAvailable = str(query.is_available);
  const q = str(query.q);

  if (name) filter.name = { $regex: escapeRegex(name), $options: "i" };
  if (description)
    filter.description = { $regex: escapeRegex(description), $options: "i" };

  const price = str(query.price);
  const priceMin = str(query.price_min);
  const priceMax = str(query.price_max);

  if (price !== undefined) {
    const n = Number(price);
    if (Number.isNaN(n)) {
      const err = new Error("price harus berupa angka");
      err.status = 400;
      throw err;
    }
    filter.price = n;
  } else if (priceMin !== undefined || priceMax !== undefined) {
    filter.price = {};
    if (priceMin !== undefined) {
      const n = Number(priceMin);
      if (Number.isNaN(n)) {
        const err = new Error("price_min harus berupa angka");
        err.status = 400;
        throw err;
      }
      filter.price.$gte = n;
    }
    if (priceMax !== undefined) {
      const n = Number(priceMax);
      if (Number.isNaN(n)) {
        const err = new Error("price_max harus berupa angka");
        err.status = 400;
        throw err;
      }
      filter.price.$lte = n;
    }
  }

  if (isAvailable !== undefined) {
    const b = toBool(isAvailable);
    if (b === undefined) {
      const err = new Error("is_available harus 'true' atau 'false'");
      err.status = 400;
      throw err;
    }
    filter.is_available = b;
  }

  if (q) {
    const re = { $regex: escapeRegex(q), $options: "i" };
    filter.$or = [{ name: re }, { description: re }];
  }

  return filter;
};

const buildSort = (query) => {
  const sortParam = str(query.sort);
  const order = str(query.order);
  const sort = {};

  if (sortParam) {
    for (const raw of sortParam.split(",")) {
      const item = raw.trim();
      if (!item) continue;

      const desc = item.startsWith("-");
      const field = desc ? item.slice(1) : item;

      const orderDesc = order && order.toLowerCase() === "desc";
      sort[field] = desc || orderDesc ? -1 : 1;
    }
  }
};

export const createMenu = async (req, res, next) => {
  try {
    const data = await MenuMakanan.create(req.body);
    res.status(201).json({
      success: true,
      message: "Menu baru berhasil ditambahkan",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllMenu = async (req, res, next) => {
  try {
    const filter = buildFilter(req.query);
    const sort = buildSort(req.query);

    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit, 10) || 10, 1),
      100,
    );
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      MenuMakanan.find(filter).sort(sort).skip(skip).limit(limit),
      MenuMakanan.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      message:
        total === 0 ? "Menu tidak ditemukan" : "Data menu berhasil diambil",
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const getMenuById = async (req, res, next) => {
  try {
    const data = await MenuMakanan.findById(req.params.id);
    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "Menu tidak ditemukan" });
    }
    res.status(200).json({
      success: true,
      message: "Detail menu berhasil diambil",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const updateMenu = async (req, res, next) => {
  try {
    const data = await MenuMakanan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "Menu tidak ditemukan" });
    }
    res.status(200).json({
      success: true,
      message: "Menu berhasil diperbarui",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteMenu = async (req, res, next) => {
  try {
    const data = await MenuMakanan.findByIdAndDelete(req.params.id);
    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "Menu tidak ditemukan" });
    }
    res.status(200).json({
      success: true,
      message: "Menu berhasil dihapus",
      data,
    });
  } catch (err) {
    next(err);
  }
};
