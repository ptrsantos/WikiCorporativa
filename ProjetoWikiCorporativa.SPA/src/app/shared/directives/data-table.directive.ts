/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/l-lin/angular-datatables/master/LICENSE
 */

import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import "datatables.net";
import * as $ from 'jquery';
import * as moment from 'moment'
import 'moment/locale/pt-br'
import 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import "datatables.net-plugins/sorting/datetime-moment"
@Directive({
    selector: '[datatable]'
})
export class DataTableDirective implements OnDestroy, OnInit {
    /**
     * The DataTable option you pass to configure your table.
     */
    @Input() dtOptions: DataTables.Settings = {};

    /**
     * This trigger is used if one wants to trigger manually the DT rendering
     * Useful when rendering angular rendered DOM
     */
    @Input() dtTrigger: Subject<any>;

    /**
     * The DataTable instance built by the jQuery library [DataTables](datatables.net).
     *
     * It's possible to execute the [DataTables APIs](https://datatables.net/reference/api/) with
     * this variable.
     */
    dtInstance: Promise<DataTables.Api>;

    // Only used for destroying the table when destroying this directive
    private dt: DataTables.Api;

    constructor(private el: ElementRef) {
        ($ as any).fn.dataTable.moment('L');
    }

    ngOnInit(): void {
        if (this.dtTrigger) {
            this.dtTrigger.subscribe(rows => {
                if (!$.fn.dataTable.isDataTable(this.el.nativeElement) || ($.fn.dataTable.isDataTable(this.el.nativeElement) && !rows)) {
                    this.displayTable();
                }
                else {
                    this.redraw(rows);
                }
            });
        } else {
            this.displayTable();
        }
    }

    private redraw(rows: any) {
        this.dtInstance = new Promise((resolve, reject) => {
            Promise.resolve(this.dtOptions).then(dtOptions => {
                // Using setTimeout as a "hack" to be "part" of NgZone
                setTimeout(() => {
                    // resolve(this.dt.clear().draw(false));

                    resolve(this.dt.clear().rows.add(rows).draw(false));
                });
            });
        });
    }

    private displayTable(): void {
        while ($.fn.dataTable.isDataTable(this.el.nativeElement)) this.dt.destroy();

        this.dtInstance = new Promise((resolve, reject) => {
            Promise.resolve(this.dtOptions).then(dtOptions => {
                // Using setTimeout as a "hack" to be "part" of NgZone
                setTimeout(() => {
                    if (!$.fn.dataTable.isDataTable(this.el.nativeElement)) {
                        this.dt = $(this.el.nativeElement).DataTable(dtOptions);

                        // if (dtOptions['buttons']) {
                        //     const botoes: any = dtOptions['buttons'];

                        //     new $.fn.dataTable.Buttons(this.dt, {
                        //         buttons: botoes
                        //     });
                        // }

                        resolve(this.dt);

                    }
                });
            });
        });
    }

    ngOnDestroy(): void {
        if (this.dtTrigger) this.dtTrigger.unsubscribe();

        if (this.dt) this.dt.destroy(true);
    }
}

