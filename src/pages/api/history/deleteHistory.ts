import type { NextApiRequest, NextApiResponse } from "next";
const db = require("../../../../common/config/db");

export default async function deleteHistory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("deleteHistory REQ", req.body.data);
  const values: any = [];
  req.body.data.map((item: any) => {
    values.push(`"${item}"`);
  });
  console.log("values", `(${values})`);
  db.query(
    `DELETE FROM op_history WHERE no IN (${values})`,
    function (err: any, result: any) {
      if (err) {
        // console.log("에러는 ?", err);
        res.send(err);
      } else {
        // console.log("결과는 ?", result);
        res.json(result);
      }
    }
  );
}
