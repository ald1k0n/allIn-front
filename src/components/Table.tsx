import {
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	flexRender,
	getPaginationRowModel,
	getFilteredRowModel,
} from '@tanstack/react-table';
import { useState, FC, useMemo } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { Input } from '.';

interface IProps {
	data: Array<any>;
	columns: Array<any>;
}

export const Table: FC<IProps> = ({ data = [], columns = [] }) => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [search, setSearch] = useState<string>('');

	const cols = useMemo(() => columns, [columns]);

	const table = useReactTable({
		data,
		columns: cols,
		state: {
			sorting,
			globalFilter: search,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onGlobalFilterChange: setSearch,
	});

	return (
		<div className='w-full p-3 overflow-auto flex items-center gap-y-3 flex-col'>
			<div className='w-80'>
				<Input
					input_size='medium'
					type='search'
					placeholder='Поиск'
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			<table className='w-full border'>
				<thead className='bg-gray-300'>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<th
										className='px-2.5 py-2 border'
										key={header.id}
										colSpan={header.colSpan}>
										{header.isPlaceholder ? null : (
											<div
												{...{
													className: 'cursor-pointer',
													onClick: header.column.getToggleSortingHandler(),
												}}>
												{flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
											</div>
										)}
									</th>
								);
							})}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => {
						return (
							<tr key={row.id}>
								{row.getVisibleCells().map((cell) => {
									return (
										<td
											className='text-center border py-1.5 px-2'
											key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className='w-full flex justify-between mt-3'>
				<div>
					<span className='flex items-center gap-1'>
						<div>Страница</div>
						<strong>
							{table.getState().pagination.pageIndex + 1} из{' '}
							{table.getPageCount()}
						</strong>
					</span>
				</div>
				<div className='flex gap-2'>
					<div className='w-42'>
						<button
							disabled={table.getState().pagination.pageIndex === 0}
							onClick={() => table.previousPage()}
							className='w-12 h-12 disabled:bg-orange-200 bg-orange-400 rounded-full flex justify-center items-center'>
							{
								<GrPrevious className='text-white text-center text-xl font-medium' />
							}
						</button>
					</div>
					<div className='w-42'>
						<button
							disabled={
								table.getState().pagination.pageIndex ===
								table.getPageCount() - 1
							}
							onClick={() => table.nextPage()}
							className='w-12 h-12 disabled:bg-orange-200 bg-orange-400 rounded-full flex justify-center items-center'>
							{
								<GrNext className='text-white text-center text-xl font-medium' />
							}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
