<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Row style="margin:10px">
            <Col span="8">
                <span class="expand-key">用户性别： </span>
                <span class="expand-value"> {{ row.gender }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">登录地点： </span>
                <span class="expand-value"> {{ row.loginSite }}</span>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        name: "tableExpand",
        props: {
            row: Object
        }
    };
</script>