import { Button } from '@/components/ui/button'
import { db } from '@/configs'
import { userResponses } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { Loader2 } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import * as XLSX from 'xlsx';

function FormListItemResp({ jsonForm, formRecord }) {
  const [loading, setLoading] = useState(false);
  const [responseCount, setResponseCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await db.select().from(userResponses)
        .where(eq(userResponses.formRef, formRecord.id));
      if (result) {
        setResponseCount(result.length);
        setLoading(false);
      }
    }
    fetchData();
  }, [formRecord.id]);

  const exportToExcel = (jsonData) => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, jsonForm?.formTitle + ".xlsx");
  }

  const handleExportData = async () => {
    let jsonData = [];
    setLoading(true);
    const result = await db.select().from(userResponses)
      .where(eq(userResponses.formRef, formRecord.id));
    if (result) {
      result.forEach((item) => {
        const jsonItem = JSON.parse(item.jsonResponse);
        jsonData.push(jsonItem);
      });
      setLoading(false);
    }
    exportToExcel(jsonData);
  }

  return (
    <div className='border shadow-sm rounded-lg p-4 my-5'>
      <h2 className='text-lg text-black'>{jsonForm?.formTitle}</h2>
      <h2 className='text-sm text-gray-500'>{jsonForm?.formHeading}</h2>
      <hr className='my-4'></hr>
      <div className='flex justify-between items-center'>
        <h2 className='text-sm'><strong>{responseCount}</strong> Responses</h2>
        <Button className="" size="sm"
          onClick={handleExportData}
          disabled={loading}
        >
          {loading ? <Loader2 className='animate-spin' /> : 'Export'}
        </Button>
      </div>
    </div>
  )
}

export default FormListItemResp;
