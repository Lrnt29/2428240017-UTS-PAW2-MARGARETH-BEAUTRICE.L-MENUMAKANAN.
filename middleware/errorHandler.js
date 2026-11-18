// 404 untuk route yang tidak ada
export const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} tidak ditemukan`,
  });
};

// Penanganan error global (selalu JSON)
export const errorHandler = (err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      success: false,
      message: 'Format JSON pada request body tidak valid',
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Input tidak valid',
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Nilai '${err.value}' tidak valid untuk field ${err.path}`,
    });
  }

  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.status ? err.message : 'Terjadi kesalahan pada server',
  });
};
