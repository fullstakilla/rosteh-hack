import { ToolParameter } from "@/lib/types";
import { AlertTriangle } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface ParametersCardProps {
    parameters: ToolParameter[];
}

export function ParametersCard({ parameters }: ParametersCardProps) {
    return (
        <div className={`border-2 rounded-lg overflow-hidden border-gray-200`}>
            <div className={`p-3 font-bold font-mono text-lg bg-gray-100`}>
                Параметры оборудования
            </div>

            <Table>
                <TableBody>
                    {parameters.map((param, index) => (
                        <TableRow
                            key={index}
                            className={`${
                                param.status === "warning"
                                    ? "hover:bg-amber-50"
                                    : param.status === "critical"
                                    ? "hover:bg-red-50"
                                    : "hover:bg-green-50"
                            }`}
                        >
                            <TableCell className="w-12 pl-4">
                                <param.icon
                                    className={`h-6 w-6 ${
                                        param.status === "warning"
                                            ? "text-amber-500"
                                            : param.status === "critical"
                                            ? "text-red-500"
                                            : "text-green-500"
                                    }`}
                                />
                            </TableCell>
                            <TableCell className="font-mono">
                                {param.name}
                            </TableCell>
                            <TableCell className="font-mono font-bold text-center">
                                {param.value}
                            </TableCell>
                            <TableCell className="w-12">
                                {param.status === "warning" && (
                                    <AlertTriangle className="h-6 w-6 text-amber-500" />
                                )}
                                {param.status === "normal" && (
                                    <div className="h-6 w-6 rounded-sm bg-green-500" />
                                )}
                            </TableCell>
                            <TableCell
                                className={`font-mono ${
                                    param.status === "warning"
                                        ? "text-amber-500 font-semibold"
                                        : param.status === "critical"
                                        ? "text-red-500 font-semibold"
                                        : "text-green-500 font-semibold"
                                }`}
                            >
                                {param.statusText}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
