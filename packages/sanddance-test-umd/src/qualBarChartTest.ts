// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
///<reference path='../node_modules/@msrvida/sanddance/dist/umd/sanddance.d.ts' />

namespace qualBarChartTest {

    declare var deck: SandDance.VegaDeckGl.types.DeckBase & SandDance.VegaDeckGl.types.DeckLayerBase;
    declare var luma: SandDance.VegaDeckGl.types.LumaBase;
    declare var vega: SandDance.VegaDeckGl.types.VegaBase;

    SandDance.use(vega, deck, deck, luma);
    export const viewer = new SandDance.Viewer(document.getElementById('vis'));

    interface MyData {
        myColor: string;
        mySort: number;
        myUid: number;
        myX: string;
        myY: number;
        myZ: number;
    }

    function getValue(i) {
        if (i < 20) return 0;
        if (i < 25) return 1;
        if (i < 35) return 2;
        return 3;
    }

    const data: MyData[] = [];

    for (let i = 0; i < 70; i++) {
        let v = getValue(i);
        data.push({
            myUid: i,
            myX: `cat${v}`,
            myY: i,
            myZ: i,
            myColor: v.toString(),
            mySort: i
        })
    }
    const glDiv = viewer.presenter.getElement(SandDance.VegaDeckGl.PresenterElement.gl);
    const insight: SandDance.types.Insight = {
        columns: {
            color: 'myColor',
            sort: 'mySort',
            uid: 'myUid',
            x: 'myX',
            y: 'myY',
            z: 'myZ'
        },
        scheme: 'category20',
        size: {
            height: glDiv.offsetHeight,
            width: glDiv.offsetWidth
        },
        chart: "barchart",
        view: "2d"
    };

    viewer.render(insight, data, { columnTypes: { 'myColor': 'string' } });
}
