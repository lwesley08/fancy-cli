module.exports = {
newTSFile: async (componentName) => {
return `
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class ${componentName} extends Vue {
    
}
`;
},

newHTMLFile: async (componentName) => {
return `
<template>
    <div>
        <p>This component is brought to you by fancy.</p>
    </div>
</template>
<script lang="ts" src="./${componentName.toLowerCase()}.ts"></script>
`;
}
}