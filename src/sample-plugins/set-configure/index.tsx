import React from 'react';
import { material } from '@alilc/lowcode-engine';

import addonCombine from './addon-combine'

export const registerDefaults = () => {
    
    material.registerMetadataTransducer(addonCombine, 2, 'combine-props123');
   
  };