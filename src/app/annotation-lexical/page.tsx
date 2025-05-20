"use client";

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import "./index.css";

import * as React from "react";

import AnnotateLexical from "./AnnotateLexical";

export default function AnnotationLexicalPage() {
    return (
        <React.StrictMode>
            <AnnotateLexical> ok can this work please </AnnotateLexical>
        </React.StrictMode>
    );
}
