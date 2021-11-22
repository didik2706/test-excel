const express = require('express');
const router = express.Router();
const db = require('../config/connection');

const excel = require('exceljs');

router.get('/excel', async (req, res) => {
  const data = await db('tb_users')
    .join('tb_log_activity', 'tb_users.id_user', 'tb_log_activity.user_id')
    .select();

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Monthly Report');

    worksheet.columns = [
      { header: 'Id', key: 'user_id', width: 5 },
      { header: 'Participant', key: 'participant', width: 10 },
    ];

    worksheet.addRows(data)

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "tutorials.xlsx"
    );

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
});

module.exports = router;
