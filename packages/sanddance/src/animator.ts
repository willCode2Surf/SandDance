// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { DataScope } from './dataScope';
import { Search } from './searchExpression/types';

export enum DataLayoutChange {
    same, reset, refine
}

export interface Props {
    onAnimateDataChange: (dataChange: DataLayoutChange, waitingLabel: string, handlerLabel: string) => Promise<void>;
    onDataChanged: (dataChange: DataLayoutChange, search?: Search) => void;
}

export class Animator {

    constructor(private dataScope: DataScope, private props: Props) { }

    select(search: Search) {
        return new Promise<void>((resolve, reject) => {
            this.dataScope.select(search);
            this.props.onDataChanged(DataLayoutChange.same);
            resolve();
        });
    }

    deselect() {
        return new Promise<void>((resolve, reject) => {
            this.dataScope.deselect();
            this.props.onDataChanged(DataLayoutChange.same);
            resolve();
        });
    }

    filter(search: Search, keepData: object[], collapseData: object[]) {
        this.dataScope.collapse(true, collapseData);
        return new Promise<void>((resolve, reject) => {
            this.props.onAnimateDataChange(DataLayoutChange.refine, 'before refine', 'refine').then(() => {
                this.dataScope.deselect();
                this.dataScope.filteredData = keepData;
                this.props.onDataChanged(DataLayoutChange.refine, search);
                resolve();
            }).catch(reject);
        });
    }

    reset() {
        return new Promise<void>((resolve, reject) => {
            this.dataScope.deselect();
            this.dataScope.filteredData = null;
            this.props.onAnimateDataChange(DataLayoutChange.reset, 'before reset', 'reset').then(() => {
                this.dataScope.collapse(false);
                this.props.onDataChanged(DataLayoutChange.reset);
                resolve();
            }).catch(reject);
        });
    }

    activate(datum: object) {
        return new Promise<void>((resolve, reject) => {
            this.dataScope.activate(datum);
            this.props.onDataChanged(DataLayoutChange.same);
            resolve();
        });
    }

    deactivate() {
        return new Promise<void>((resolve, reject) => {
            this.dataScope.deactivate();
            this.props.onDataChanged(DataLayoutChange.same);
            resolve();
        });
    }

}