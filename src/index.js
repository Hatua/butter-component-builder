import React from 'react';
import {translate} from 'react-i18next';

let Test = ({t}) => (
    <div>
        test
        <br/>
        {t('translated')}
        <br/>
        <button className="btn btn-primary">test bootstrap</button>
    </div>
)

export default translate('test')(Test)
