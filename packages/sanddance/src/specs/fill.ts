// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { ScaleNames, FieldNames } from './constants';
import { ColorValueRef, ProductionRule } from 'vega-typings';
import { Column, SpecViewOptions } from './types';
import { util } from '../vega-deck.gl';

export function fill(colorColumn: Column, specViewOptions: SpecViewOptions): ProductionRule<ColorValueRef> {
    return colorColumn ?
        {
            "scale": ScaleNames.Color,
            "field": colorColumn.quantitative ? colorColumn.name : FieldNames.Top
        }
        :
        {
            "value": util.colorToString(specViewOptions.colors.defaultCube)
        }
}