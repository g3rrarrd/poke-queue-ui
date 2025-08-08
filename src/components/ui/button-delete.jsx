// components/ui/button-delete.jsx
import React, { useState } from "react"
import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog" 
import ReportService from "@/services/report-service"

const ButtonDelete = ({ reportId, onSuccess }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      await ReportService.deleteReport(reportId)
      setOpen(false)
      onSuccess?.()
    } catch (error) {
      console.error("Error al eliminar reporte:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="icon"
          title="Eliminar Reporte"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white p-6 rounded-md shadow-md max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar reporte?</AlertDialogTitle>
        </AlertDialogHeader>

        <p>Esta acción no se puede deshacer. El reporte se eliminará permanentemente del sistema.</p>

        <AlertDialogFooter className="mt-4 flex justify-end gap-2">
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancelar</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Eliminando..." : "Eliminar"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ButtonDelete
