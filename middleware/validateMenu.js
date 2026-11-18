

const validateMenu = (req, res, next) => {
  const body = req.body;

  if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Request body harus berupa JSON object dan tidak boleh kosong.',
    });
  }

  const errors = [];


  for (const field of ['name', 'description']) {
    const value = body[field];
    if (value === undefined || value === null) {
      errors.push(`${field} wajib diisi`);
    } else if (typeof value !== 'string') {
      errors.push(`${field} harus bertipe String`);
    } else if (value.trim() === '') {
      errors.push(`${field} tidak boleh kosong`);
    }
  }


  const price = body.price;
  if (price === undefined || price === null || price === '') {
    errors.push('price wajib diisi');
  } else if (typeof price !== 'number' || Number.isNaN(price)) {
    errors.push('price harus bertipe Number (contoh: 50000)');
  } else if (price < 0) {
    errors.push('price tidak boleh negatif');
  }


  const avail = body.is_available;
  if (avail === undefined || avail === null) {
    errors.push('is_available wajib diisi');
  } else if (typeof avail !== 'boolean') {
    errors.push('is_available harus bertipe Boolean (true/false)');
  }


export default validateMenu;
